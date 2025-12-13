export const calculadora = (operacion , ...values) => {
    if(operacion === "+"){

      return  values.reduce((value,acc) => acc + value,0)

    }
}
