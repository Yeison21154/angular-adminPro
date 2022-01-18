

export interface RegistroInt {
    nombre:     string,
    email:      string,
    password:   string,
    passwordC:  string,
    term:       boolean
}
export interface LoginInt{
    email:      string,
    password:   string,
    recordar:   boolean
}
export interface ActUserInt{
    nombre:     string,
    email:      string,
    rol:        string
}