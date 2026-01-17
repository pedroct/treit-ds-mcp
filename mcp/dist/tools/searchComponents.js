export function searchComponents(index, input) {
    const query = input.query?.toLowerCase().trim();
    const tags = input.tags?.map((tag) => tag.toLowerCase()) ?? [];
    return index.list.filter((component) => {
        if (input.category && component.category !== input.category) {
            return false;
        }
        if (query) {
            const haystack = `${component.name} ${component.filePath} ${component.summary}`.toLowerCase();
            if (!haystack.includes(query)) {
                return false;
            }
        }
        if (tags.length > 0) {
            const componentTags = component.tags.map((tag) => tag.toLowerCase());
            if (!tags.every((tag) => componentTags.includes(tag))) {
                return false;
            }
        }
        return true;
    }).map((component) => ({
        name: component.name,
        category: component.category,
        filePath: component.filePath,
        tags: component.tags,
    }));
}
