
export const isValidString = (name:string) => /^[A-Za-z ]+$/.test(name);

export const isValidEmail = (email:string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidNumbers = (value:string) => /^\d+$/.test(value);

export const dataFormat = (date:string)=>{
    return date.split("T")[0]
}

export const capitalizeWords = (text:string = "") => {
  return text
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}