export function parseCSV(text: string): Record<string, string>[] {
    const [headerLine, ...rows] = text.trim().split("\n");
    const headers = headerLine.split(",");
    return rows.map((row) => {
        const values = parseRow(row);
        return Object.fromEntries(headers.map((h, i) => [h.trim(), values[i]?.trim()]));
    });
}

function parseRow(row: string): string[] {
    const values: string[] = [];
    let i = 0;
    while (i < row.length) {
        if (row[i] === '"') {
            // quoted field
            let val = "";
            i++; // skip opening quote
            while (i < row.length) {
                if (row[i] === '"' && row[i + 1] === '"') {
                    val += '"';
                    i += 2; // escaped quote
                } else if (row[i] === '"') {
                    i++;
                    break; // closing quote
                } else {
                    val += row[i++];
                }
            }
            values.push(val);
            if (row[i] === ",") i++; // skip comma
        } else {
            const end = row.indexOf(",", i);
            if (end === -1) {
                values.push(row.slice(i).trim());
                break;
            }
            values.push(row.slice(i, end).trim());
            i = end + 1;
        }
    }
    return values;
}
