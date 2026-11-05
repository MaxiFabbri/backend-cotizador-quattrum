export function parseMonthlyMetricsRange({ fromMonth, toMonth }) {
    for (const value of [fromMonth, toMonth]) {
        if (value !== undefined && (typeof value !== "string" || !/^(?!0000)\d{4}-(0[1-9]|1[0-2])$/.test(value))) {
            throw new Error("Los meses deben tener formato YYYY-MM y ser válidos.");
        }
    }
    if (fromMonth && toMonth && fromMonth > toMonth) {
        throw new Error("El mes desde no puede ser posterior al mes hasta.");
    }
    return { fromMonth, toMonth };
}
