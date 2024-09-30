export const bubbleSortDemo = (): string[] => {
    const array = [5, 3, 8, 4, 2]; // Demo array
    const steps: string[] = []; // Store each step of the sorting process

    steps.push(`Initial array: [${array.join(", ")}]`);

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
            if (array[j] > array[j + 1]) {
                // Swap elements
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                steps.push(`Swapped: [${array.join(", ")}]`);
            }
        }
        steps.push(`After pass ${i + 1}: [${array.join(", ")}]`);
    }

    steps.push(`Sorted array: [${array.join(", ")}]`);

    return steps;
};