class InsereDespesa {
    constructor(){
        //cria os atalhos e carrega os eventos
        this.formulario = document.querySelector('.formulario');
        this.resultado = document.querySelector('.resultado');
        this.clearButton = document.querySelector('#limparD');
        this.addCatBtn = document.querySelector('#btnNovaCategoria');
        this.eventos();
        this.carregarDespesas();
    }
    
    eventos(){
        //botao de enviar
        this.formulario.addEventListener('submit', (e) => {
            this.handleSubmit(e);
        });
        //botao de apagar  todas as tarefas
        this.clearButton.addEventListener('click', (e)=>{
            this.limparDespesas(e);
        });
        //botao de adicionar tarefas
        this.addCatBtn.addEventListener('click', (e)=>{
            this.novaOpcao(e);
        });
    }

    handleSubmit(e){
        e.preventDefault();  

        //Se a despesa tiver uma categoria e for enviada, alertar que a despesa foi criada
        if (this.addDespesa() && this.addCategoria()) {
            alert('Despesa criada');
            this.formulario.reset();
            this.carregarCategorias();
        }
    }

    addDespesa(){
        //peguei todos os dados do formulário
        const despesaNome = this.formulario.querySelector('.despesa').value.trim();
        const despesaQuantia = this.formulario.querySelector('.quantia').value.trim();
        const despesaData = this.formulario.querySelector('.data').value;
        const despesaCategoria = this.formulario.querySelector('.selectCat').value.trim();
        const categoria = this.formulario.querySelector('.selectCat').value.trim();

        //aqui ele verifica se cada um dos campos estão preenchidos para serem enviados
        if (!despesaNome || !despesaQuantia || !despesaData || !categoria) {
            alert("Preencha todos os campos da despesa!");
            return false; //bloqueia o envio do formulário (true envia)
        }
       
        //Recupera um array de despesas do localStorage, convertendo de JSON para objeto, 
        // ou usa um array vazio se não houver dados.
        let despesasFromStorage = JSON.parse(localStorage.getItem('despesas')) || [];

        //Se não existir uma despesa com a mesma categoria, adiciona uma nova ao array.
        if(!despesasFromStorage.some(cat => cat.categoria === categoria)){
            despesasFromStorage.push({ nome: despesaNome, 
                categoria: despesaCategoria,
                id: Date.now(), 
                quantia: despesaQuantia, 
                data: despesaData, 
                concluida: false,
                });
        }
        //adiciona o array de desespasFromStorage no localStorge, convertendo ele em string e nomeando como despesas
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
        //When the user submit the form, all fields will be empty
        this.resultado.innerHTML = '';
        //For every submitted expense
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
