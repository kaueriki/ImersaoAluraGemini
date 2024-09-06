let section = document.getElementById("resultados-pesquisa");
let semResultados = document.getElementById("sem-resultados");
let temaFilter = document.getElementById("tema-filter");
let resultados = "";

let temasSet = new Set();
dados.forEach(dado => dado.temas.forEach(tema => temasSet.add(tema.trim())));
temasSet.forEach(tema => {
    let option = document.createElement("option");
    option.value = tema;
    option.text = tema;
    temaFilter.add(option);
});

function pesquisar() {
    let inputSearch = document.getElementById("input-search").value.toLowerCase();
    let temaSelecionado = temaFilter.value;

    resultados = "";
    let encontrou = false;

    for (let dado of dados) {
        let matchTitulo = dado.titulo.toLowerCase().includes(inputSearch);
        let matchTema = temaSelecionado === "" || dado.temas.includes(temaSelecionado);

        if (matchTitulo && matchTema) {
            resultados += `
            <div class="item-resultado">
                <h2>
                    <a href="${dado.link}" target="_blank">${dado.titulo}</a>
                </h2>
                <p class="descricao-meta">${dado.descricao}</p>
                <p class="descricao-meta">Número de inscritos: ${dado.inscritos}</p>
                <p class="descricao-meta">Temas: ${dado.temas.join(", ")}</p>
                <a href="${dado.link}" target="_blank">Visitar canal</a>
            </div>
            `;
            encontrou = true;
        }
    }


    if (!encontrou) {
        semResultados.style.display = "block";
        section.innerHTML = ""; 
    } else {
        semResultados.style.display = "none";
        section.innerHTML = resultados; 
    }
}