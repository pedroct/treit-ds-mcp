#!/bin/bash
echo "Waiting for nginx to stabilize..."
sleep 5

echo "Checking nginx status..."
ssh root@srv1264175.hstgr.cloud << 'ENDSSH'
docker ps --filter name=nginx-aponta
echo ""
echo "Checking nginx logs..."
docker logs --tail 50 nginx-aponta 2>&1 | tail -20
echo ""
echo "Testing public endpoints..."
curl -f https://ds.treit.com.br/ > /dev/null 2>&1 && echo "✅ ds.treit.com.br is accessible" || echo "❌ ds.treit.com.br failed"
curl -f https://mcp.treit.com.br/health > /dev/null 2>&1 && echo "✅ mcp.treit.com.br is accessible" || echo "❌ mcp.treit.com.br failed"
ENDSSH
