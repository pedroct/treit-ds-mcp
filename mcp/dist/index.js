import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListResourcesRequestSchema, ListToolsRequestSchema, ReadResourceRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
import http from "node:http";
import { URL } from "node:url";
import { findRepoRoot } from "./utils/fs.js";
import { buildComponentsIndex, getComponentByName } from "./providers/componentsProvider.js";
import { getColorsResource } from "./providers/colorsProvider.js";
import { getSemanticColorsResource } from "./providers/semanticColorsProvider.js";
import { getTypographyResource } from "./providers/typographyProvider.js";
import { getSpacingResource } from "./providers/spacingProvider.js";
import { getIconsResource } from "./providers/iconsProvider.js";
import { getCardsPattern, getLayoutPattern } from "./providers/patternsProvider.js";
import { searchComponents } from "./tools/searchComponents.js";
import { scaffoldComponent } from "./tools/scaffoldComponent.js";
import { validateUsage } from "./tools/validateUsage.js";
const COMPONENTS_RESOURCE_URI = "resource://components";
async function main() {
    const repoRoot = await findRepoRoot(process.cwd());
    const componentsIndex = await buildComponentsIndex(repoRoot);
    const server = new Server({
        name: "treit-design-system-mcp",
        version: "0.1.0",
    }, {
        capabilities: {
            resources: {},
            tools: {},
        },
    });
    const listResources = () => ({
        resources: [
            { uri: "resource://tokens/colors", name: "Tokens: Colors", mimeType: "application/json" },
            { uri: "resource://tokens/typography", name: "Tokens: Typography", mimeType: "application/json" },
            { uri: "resource://tokens/spacing", name: "Tokens: Spacing", mimeType: "application/json" },
            { uri: "resource://semantic-colors", name: "Semantic Colors", mimeType: "application/json" },
            { uri: "resource://icons", name: "Icons", mimeType: "application/json" },
            { uri: COMPONENTS_RESOURCE_URI, name: "Components Catalog", mimeType: "application/json" },
            { uri: "resource://patterns/layout", name: "Patterns: Layout", mimeType: "application/json" },
            { uri: "resource://patterns/cards", name: "Patterns: Cards", mimeType: "application/json" },
        ],
    });
    const getResourcePayload = async (uri) => {
        if (uri === "resource://tokens/colors") {
            return getColorsResource(repoRoot);
        }
        if (uri === "resource://tokens/typography") {
            return getTypographyResource(repoRoot);
        }
        if (uri === "resource://tokens/spacing") {
            return getSpacingResource(repoRoot);
        }
        if (uri === "resource://semantic-colors") {
            const colors = await getColorsResource(repoRoot);
            return getSemanticColorsResource(colors);
        }
        if (uri === "resource://icons") {
            return getIconsResource(repoRoot);
        }
        if (uri === COMPONENTS_RESOURCE_URI) {
            return componentsIndex.list.map((component) => ({
                name: component.name,
                category: component.category,
                filePath: component.filePath,
                tags: component.tags,
            }));
        }
        if (uri.startsWith(`${COMPONENTS_RESOURCE_URI}/`)) {
            const name = uri.replace(`${COMPONENTS_RESOURCE_URI}/`, "");
            return getComponentByName(componentsIndex, name);
        }
        if (uri === "resource://patterns/layout") {
            return getLayoutPattern(repoRoot);
        }
        if (uri === "resource://patterns/cards") {
            return getCardsPattern(repoRoot);
        }
        return null;
    };
    const handleToolCall = (toolName, args) => {
        if (toolName === "tool.searchComponents") {
            return searchComponents(componentsIndex, args);
        }
        if (toolName === "tool.scaffoldComponent") {
            if (typeof args.name !== "string" || (args.category !== "ui" && args.category !== "layout")) {
                throw new Error("Invalid input for tool.scaffoldComponent.");
            }
            return scaffoldComponent(args);
        }
        if (toolName === "tool.validateUsage") {
            if (typeof args.code !== "string") {
                throw new Error("Invalid input for tool.validateUsage.");
            }
            return validateUsage(args);
        }
        throw new Error(`Unknown tool: ${toolName}`);
    };
    server.setRequestHandler(ListResourcesRequestSchema, async () => listResources());
    server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
        const uri = request.params.uri;
        const payload = await getResourcePayload(uri);
        if (!payload) {
            throw new Error(`Unknown resource: ${uri}`);
        }
        return {
            contents: [
                {
                    uri,
                    mimeType: "application/json",
                    text: JSON.stringify(payload, null, 2),
                },
            ],
        };
    });
    server.setRequestHandler(ListToolsRequestSchema, async () => {
        return {
            tools: [
                {
                    name: "tool.searchComponents",
                    description: "Search components by name, category, or tags.",
                    inputSchema: {
                        type: "object",
                        properties: {
                            query: { type: "string" },
                            category: { type: "string", enum: ["ui", "layout"] },
                            tags: { type: "array", items: { type: "string" } },
                        },
                    },
                },
                {
                    name: "tool.scaffoldComponent",
                    description: "Generate new component scaffolding (no files written).",
                    inputSchema: {
                        type: "object",
                        properties: {
                            name: { type: "string" },
                            category: { type: "string", enum: ["ui", "layout"] },
                            base: { type: "string", enum: ["Card", "Button", "Layout", "Primitive"] },
                            withStory: { type: "boolean" },
                        },
                        required: ["name", "category"],
                    },
                },
                {
                    name: "tool.validateUsage",
                    description: "Validate code usage against DS rules.",
                    inputSchema: {
                        type: "object",
                        properties: {
                            code: { type: "string" },
                        },
                        required: ["code"],
                    },
                },
            ],
        };
    });
    server.setRequestHandler(CallToolRequestSchema, async (request) => {
        const toolName = request.params.name;
        const args = (request.params.arguments ?? {});
        const result = handleToolCall(toolName, args);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    });
    const transport = new StdioServerTransport();
    await server.connect(transport);
    const httpPort = Number(process.env.MCP_HTTP_PORT ?? "");
    if (!Number.isNaN(httpPort) && httpPort > 0) {
        const httpServer = http.createServer(async (req, res) => {
            const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);
            if (req.method === "GET" && url.pathname === "/health") {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ ok: true, name: "treit-design-system-mcp" }));
                return;
            }
            if (req.method === "GET" && url.pathname === "/resources") {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(listResources(), null, 2));
                return;
            }
            if (req.method === "GET" && url.pathname === "/resource") {
                const uri = url.searchParams.get("uri");
                if (!uri) {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: "Missing uri query parameter." }));
                    return;
                }
                const payload = await getResourcePayload(uri);
                if (!payload) {
                    res.writeHead(404, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: "Resource not found." }));
                    return;
                }
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(payload, null, 2));
                return;
            }
            if (req.method === "POST" && url.pathname === "/tool") {
                const chunks = [];
                req.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
                req.on("end", () => {
                    try {
                        const body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
                        if (!body.name) {
                            res.writeHead(400, { "Content-Type": "application/json" });
                            res.end(JSON.stringify({ error: "Missing tool name." }));
                            return;
                        }
                        const result = handleToolCall(body.name, body.arguments ?? {});
                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.end(JSON.stringify(result, null, 2));
                    }
                    catch (error) {
                        res.writeHead(400, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ error: "Invalid JSON payload.", detail: String(error) }));
                    }
                });
                return;
            }
            if (req.method === "GET" && url.pathname === "/events") {
                res.writeHead(200, {
                    "Content-Type": "text/event-stream",
                    "Cache-Control": "no-cache",
                    Connection: "keep-alive",
                });
                res.write(`event: ready\ndata: ${JSON.stringify({ name: "treit-design-system-mcp" })}\n\n`);
                const interval = setInterval(() => {
                    res.write(`event: ping\ndata: ${Date.now()}\n\n`);
                }, 30000);
                req.on("close", () => {
                    clearInterval(interval);
                });
                return;
            }
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Not found." }));
        });
        httpServer.listen(httpPort, () => {
            console.log(`[mcp] HTTP server listening on :${httpPort}`);
        });
    }
    // Keep process alive for stdio transport.
    process.stdin.resume();
    process.on("SIGINT", () => {
        process.exit(0);
    });
    process.on("SIGTERM", () => {
        process.exit(0);
    });
}
main().catch((error) => {
    console.error(error);
    process.exit(1);
});
