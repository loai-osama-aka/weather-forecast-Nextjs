export function convertFahrenheitToCelsius(fahrenheit: number): number {
    const celsius = (fahrenheit - 32) * (5/9);
    return Math.round(celsius * 10) / 10; // Round to one decimal place
}