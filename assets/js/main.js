import { Cadastrar } from './cadastro/index.js';
import { login } from './login/index.js';
import { btnCadastro, dataHoje, dataLimiteLote, dataLote, divLote, formLogin, loginDocumento, loginPais, loginPassword, nomeLote, precoLoteBr, precoLoteUy } from './ui.js';

//--- Cadastro -----------------------------------------------------------------
function removeBtn(btn) {
    let node = btn
    if (node.parentNode) {
        node.parentNode.removeChild(node);
    }
}
if (dataHoje < dataLimiteLote) {
    divLote.innerHTML = `<b>${nomeLote} </b> (${dataLote}) ${precoLoteBr} BR ou ${precoLoteUy} UY`
    const span = document.createElement("span")
    span.classList.add('text-bg-warning')
    span.classList.add('p-1')
    let txt = document.createTextNode("*Inscrições se encerrarão as 18:30h ");
    span.appendChild(txt);
    document.querySelector('.header-wrapper').appendChild(span)

    document.querySelector('.header-wrapper').style = 'min-height: 36rem;'
    Cadastrar();
} else {
    let btn = document.querySelector('#btnInscricao')
    removeBtn(btn)
    const div = document.createElement("div")
    div.classList.add('text-bg-danger')
    div.classList.add('p-1')
    let txt = document.createTextNode("Inscrições Encerradas");
    div.appendChild(txt);
    document.querySelector('.header-wrapper').style = 'min-height: 37rem;'
    document.querySelector('.header-wrapper').appendChild(div)
    divLote.hidden = true

}
formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();
    login(loginDocumento, loginPassword, loginPais);
})

