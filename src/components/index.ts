// Importación de componentes
export { default as NavBar } from "./navbar";
export { default as BoardSection } from "./Board";

 

// Atributos relacionados con el logo
export enum AttributeLogo {
    "logo" = "logo",
    "userlogo" = "userlogo",
}

// Atributos relacionados con el perfil de usuario
export enum AttributeProfile  {
    name = "name",  
    edad = "edad",
    email = "email",
	avatar = "avatar",
	uid = "uid"
}
