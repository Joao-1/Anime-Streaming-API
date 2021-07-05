export default function validationValues(values: Record<string, string>, notNullValues: string[]) {
    for (let i of notNullValues) {
        if (!values[i]) {
            return i;
        }
    }
};