export function parseCSV(text: string): Record<string, string>[] {
    const [headerLine, ...rows] = text.trim().split("\n");
    const headers = headerLine.split(",");
    return rows.map((row) => {
        const values = row.split(",");
        return Object.fromEntries(headers.map((h, i) => [h.trim(), values[i]?.trim()]));
    });
}
