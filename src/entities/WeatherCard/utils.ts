export const backgroundColor = (weatherId: number) => {
    let backgroundColor: string = '';

    if (weatherId >= 200 && weatherId < 300) {
        backgroundColor = '#f39c12';
    } else if (weatherId >= 300 && weatherId < 400) {
        backgroundColor = '#3498db';
    } else if (weatherId >= 500 && weatherId < 600) {
        backgroundColor = '#2980b9';
    } else if (weatherId >= 600 && weatherId < 700) {
        backgroundColor = '#7f8c8d';
    } else if (weatherId >= 700 && weatherId < 800) {
        backgroundColor = '#95a5a6';
    } else if (weatherId === 800) {
        backgroundColor = '#27ae60';
    } else if (weatherId > 800) {
        backgroundColor = '#16a085';
    }

    return backgroundColor
}
