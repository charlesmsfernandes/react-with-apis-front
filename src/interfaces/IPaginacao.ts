
//O typescript disponibiliza alguns tipos genéricos para uso
//Neste caso temos o T, que é um tipo genérico do será passado
//no futuro somente
export interface IPaginacao<T> {
    count: number
    next: string
    previous: string
    results: T[]
}