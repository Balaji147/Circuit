export const generateCompanyId = (companyName) => {
    const prefix = companyName
        .replace(/[^a-zA-Z]/g, "")
        .substring(0, 3)
        .toUpperCase()

    const randomNum = Math.floor(10000 + Math.random() * 90000)

    return `#${prefix}${randomNum}`
}