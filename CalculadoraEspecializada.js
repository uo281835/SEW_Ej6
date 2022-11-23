class Stack{

    constructor(){
        this.pila = new Array();
    }
    push(i){
        this.pila.push(i);
    }
    pop(){
        return this.pila.pop();
    }
    length(){
        return this.pila.length;
    }
    toString(){
        var result="";
        for(var v in this.pila){
            result+=this.pila[v]+"";
            result+="\n";
        }
        return result;
    }
}
class CalculadoraRPN{

    
    constructor(){
        this.pila = new Stack();
        this.actual =0;
        this.toggled = false;
        document.addEventListener('keydown', (event) => {
            var keyName = event.key;
            var valor = keyName;
            if(valor == 'm')
                this.multiplicar();
            else if(valor == 'd')
                this.dividir();
            else if(valor == 'r')
                this.raiz();
            else if(valor == '=')
                this.enter();
            else if(valor =='c')
                this.reset();
            else if(valor == 'o')
                this.trueReset();
            else if(valor == "Enter")
                this.evaluar();
            else if(valor == 'p')
                this.porcentaje();
            else if(valor =='c')
                this.reset();
            else if(valor == 'o')
                this.trueReset();
            else if(valor!="Enter"&&valor!="r"&&
                (Number(valor)!==NaN || valor =='+'|| valor =='-'|| valor =='.'))
                    this.add(valor);
                
          });
    }
    almacenado=0;
    visualizar(){
        var result=this.actual;
        document.getElementsByName('Actual')[0].value= result;
        document.getElementsByName('output')[0].value= this.pila.toString();
    }
    multiplicar(){
        var a=this.pila.pop();
        var b=this.pila.pop();
        this.pila.push(a*b);
        this.visualizar();
    }
    dividir(){
        var a=this.pila.pop();
        var b=this.pila.pop();
        this.pila.push(b/a);
        this.visualizar();
    }
    sumar(){
        var a=this.pila.pop();
        var b=this.pila.pop();
        this.pila.push(a+b);
        this.visualizar();
    }
    restar(){
        var a=this.pila.pop();
        var b=this.pila.pop();
        this.pila.push(b-a);
        this.visualizar();
    }

    sin(){
        var a = this.pila.pop();
        if(this.toggled)
            this.pila.push(Math.asin(a));
        else
            this.pila.push(Math.sin(a));
    }
    cos(){
        var a = this.pila.pop();
        if(this.toggled)
            this.pila.push(Math.acos(a));
        else
            this.pila.push(Math.cos(a));
    }
    tan(){
        var a = this.pila.pop();
        if(this.toggled)
        this.pila.push(Math.atan(a));
    else
        this.pila.push(Math.tan(a));
    }
    toggle(){
        this.toggled= !this.toggled;
    }
    add(i){
        if(this.actual!=0)
            this.actual *=10;
        this.actual+=i; 
        this.visualizar();
    }
    add2(i){
        add(i);
        add(i);
    }
    remove(){
        var almacenado = document.getElementsByName('output')[0].value;
        almacenado="";
        document.getElementsByName('output')[0].value= almacenado;
        this.visualizar();
    }
    enter(){
        this.pila.push(this.actual);
        this.actual=0;
        this.visualizar();
    }
    imc(){
        var peso = this.pila.pop();
        var altura = this.pila.pop();
        var imc = peso/altura;
        this.pila.push(peso);
    }
    calorias(){
        var peso = this.pila.pop();
        var altura = this.pila.pop();
        var edad = this.pila.pop();
        var imc = peso/altura;
        this.pila.push(peso);
    }
   


}
class CalculadoraDieta extends CalculadoraRPN{

    constructor(){
        document.addEventListener('keydown', (event) => {
            var keyName = event.key;
            var valor = keyName;
             if(valor == 'f')
            this.addAlimento();
            else if(valor == 'e')
            this.addEjercicio();
            
          });
        super();
        this.alimentos = new Stack();
        this.ejercicios = new Stack();
        this.alimento = true;
        this.ejercicio = false;
        this.numero = false;
    }

    addAlimento(){
        var calorias = (document.getElementsByName("Actual")[0].value);
        this.alimentos.push(new Alimento("nombre", calorias))
        document.getElementsByName("Actual")[0].value = "";
        document.getElementsByName("Nombre")[0].value = "";
        this.visualizar();
    }

    addEjercicio(){
        var calorias = (document.getElementsByName("Actual")[0].value);
        this.ejercicios.push(new Ejercicio("nombre", calorias))
        document.getElementsByName("Actual")[0].value = "";
        document.getElementsByName("Nombre")[0].value = "";
        this.visualizar();
    }
    visualizar(){
        var result=this.actual;
        document.getElementsByName('Actual')[0].value= result;
        document.getElementsByName('outputAlimentos')[0].value= this.alimentos.toString();

        document.getElementsByName('outputEjercicios')[0].value= this.ejercicios.toString();
    }
    calorias(){
        var total = 0;
        while(this.alimentos.length()>0){
            var al = this.alimentos.pop();
            total+=al.calorias;
        }
        while(this.ejercicios.length()>0){
            var al = this.ejercicios.pop();
            total-=al.calorias;
        }
        document.getElementsByName('Balance de calorias totales')[0].value = total+"";
    }
}
class Alimento{
    constructor(nombre, calorias){
        this.nombre = nombre;
        this.calorias =  Number(calorias);
    }
    toString(){
        return this.nombre + "   "+this.calorias;
    }
}

class Ejercicio{
    constructor(nombre, calorias){
        this.nombre = nombre;
        this.calorias = Number(calorias);
    }
    toString(){
        return this.nombre + "   "+this.calorias;
    }
}
calculadora = new CalculadoraDieta();

    
  onkeydown= (event)=> {if (event.code == '1') {
    calculadora.add(1);
 }};