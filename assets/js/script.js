class InsereDespesa {
    constructor(){
        this.formulario = document.querySelector('.formulario');
        this.resultado = document.querySelector('.resultado');
        this.clearButton = document.querySelector('#limparD');
        this.addCatBtn = document.querySelector('#btnNovaCategoria');
        this.eventos();
        this.carregarDespesas();
    }
    
    eventos(){
        this.formulario.addEventListener('submit', (e) => {
            this.handleSubmit(e);
        });
        this.clearButton.addEventListener('click', (e)=>{
            this.limparDespesas(e);
        });
        this.addCatBtn.addEventListener('click', (e)=>{
            this.novaOpcao(e);
        });
    }

    handleSubmit(e){
        e.preventDefault();  

        if (this.addDespesa() && this.addCategoria()) {
            alert('Despesa criada');
            this.formulario.reset();
            this.carregarCategorias();
        }
    }

    addDespesa(){
        const despesaNome = this.formulario.querySelector('.despesa').value.trim();
        const despesaQuantia = this.formulario.querySelector('.quantia').value.trim();
        const despesaData = this.formulario.querySelector('.data').value;
        const despesaCategoria = this.formulario.querySelector('.selectCat').value.trim();
        const categoria = this.formulario.querySelector('.selectCat').value.trim();

        if (!despesaNome || !despesaQuantia || !despesaData || !categoria) {
            alert("Preencha todos os campos da despesa!");
            return false;
        }

        let despesasFromStorage = JSON.parse(localStorage.getItem('despesas')) || [];
        if(!despesasFromStorage.some(cat => cat.categoria === categoria)){
            despesasFromStorage.push({ nome: despesaNome, 
                categoria: despesaCategoria,
                id: Date.now(), 
                quantia: despesaQuantia, 
                data: despesaData, 
                concluida: false,
                });
        }

        localStorage.setItem('despesas', JSON.stringify(despesasFromStorage));

        this.exibirDespesas(despesasFromStorage);
        this.addCategoria(despesasFromStorage);

        return true;
    }
    addCategoria(dadosDespesas){
        const catArray = JSON.parse(localStorage.getItem('categorias')) || [];
        if (!catArray.some(cat => cat.categoria === categoria)) {
            dadosDespesas.forEach(despesa => {
            const novaCategoria = {
                id: Date.now(),
                nome: despesa.nome,
                quantia: despesa.quantia,
                categoria,
                concluida: false
            }
            catArray.push(novaCategoria);
            localStorage.setItem('categorias', JSON.stringify(catArray));
            });
        }
        return true;
    }
    exibirDespesas(despesas){
        this.resultado.innerHTML = '';
        despesas.map((despesa) => {
            const novoElement = document.createElement('li');
            novoElement.classList.add('despesa-item');
            
            const nome = document.createElement('p');
            nome.textContent = `Descrição: ${despesa.nome}`;
            
            const categori= document.createElement('p');
            nome.textContent = `Descrição: ${despesa.categoria}`;

            const quantia = document.createElement('p');
            quantia.textContent = `Quantia: ${despesa.quantia}`;
            
            const data = document.createElement('p');
            data.textContent = `Data: ${despesa.data}`;

            const btnEditar = document.createElement("button");
            btnEditar.textContent = "Editar";
            //editar;
        btnEditar.onclick = () => {
            const novoTexto = prompt("Nova descrição:", despesas.nome);
            if (novoTexto) editarTarefa(catArray.id, novoTexto);
        }
            novoElement.appendChild(nome);
            novoElement.appendChild(categori)
            novoElement.appendChild(quantia);
            novoElement.appendChild(data);
            novoElement.appendChild(btnEditar);
            this.resultado.appendChild(novoElement);
        });
    }
    novaOpcao(){
        const novoValor =prompt('Digite uma nova Categoria');

        if(novoValor !== null && novoValor.trim() !== ""){
            const select = this.formulario.querySelector('#categoria');

            const novaC = document.createElement('option');
            novaC.value = novoValor;
            novaC.textContent= novoValor;

            select.appendChild(novaC);
        } else {
            console.log('Nenhuma opção válida foi inserida.');
        }
    }
    limparDespesas(){
        const confirmaL = confirm('Você tem certeza que deseja apagar todos seus registros?');
        if(confirmaL){
            console.log('Im working');
            localStorage.clear();
        }
    }
    carregarCategorias(){
        let categorias = JSON.parse(localStorage.getItem("categorias")) || [];
        console.log("Categorias carregadas:", categorias);
    }
    carregarDespesas(){
        let despesasFromStorage = JSON.parse(localStorage.getItem('despesas')) || [];
        this.resultado.innerHTML = ''; 
        this.exibirDespesas(despesasFromStorage);
    }
}

const novaDespesa = new InsereDespesa();
