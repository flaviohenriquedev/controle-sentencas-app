export const formatarCPF = (cpf: string) => {
    return lPad(cpf, 11).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

export const lPad = (str: string, length: number) => {
    const resto: number = length - String(str).length;
    return "0".repeat(Number(resto > 0 ? resto : "0")) + str;
};
//
// export const formatarData = (dateString, format) => {
//     const date = new Date(dateString + "T00:00:00");
//
//     if (!(date instanceof Date) || typeof format !== "string") {
//         throw new Error(
//             "Os parâmetros devem ser uma instância de Date e uma string."
//         );
//     }
//
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     const hours = String(date.getHours()).padStart(2, "0");
//     const minutes = String(date.getMinutes()).padStart(2, "0");
//     const seconds = String(date.getSeconds()).padStart(2, "0");
//
//     const formattedDate = format
//         .replace("yyyy", year)
//         .replace("MM", month)
//         .replace("dd", day)
//         .replace("HH", hours)
//         .replace("mm", minutes)
//         .replace("ss", seconds);
//
//     return formattedDate;
// };
