function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function formatarData(dataStr) {
    const parts = dataStr.split('-');
    const dia = parts[2];
    const mes = parts[1];
    const ano = parts[0];
    return `${dia}/${mes}/${ano}`;
}

function obterMesPorExtenso(meses) {
    const mesesExtenso = {
        1: 'um', 2: 'dois', 3: 'três', 4: 'quatro', 5: 'cinco',
        6: 'seis', 7: 'sete', 8: 'oito', 9: 'nove', 10: 'dez',
        11: 'onze', 12: 'doze', 13: 'treze', 14: 'quatorze', 15: 'quinze',
        16: 'dezesseis', 17: 'dezessete', 18: 'dezoito', 19: 'dezenove',
        20: 'vinte', 21: 'vinte e um', 22: 'vinte e dois', 23: 'vinte e três',
        24: 'vinte e quatro'
    };
    return mesesExtenso[meses] || meses;
}

function converterValorPorExtenso(valor) {
    const valorNum = parseFloat(valor.replace('.', '').replace(',', '.'));
    const inteiro = Math.floor(valorNum);
    const centavos = Math.round((valorNum - inteiro) * 100);

    function numeroPorExtenso(num) {
        if (num === 0) return 'zero';

        const unidades = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
        const dezenas = ['', 'dez', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
        const especiais = 'dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove';
        const centenas = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];

        let resultado = '';

        if (num >= 1000) {
            const milhares = Math.floor(num / 1000);
            if (milhares === 1) {
                resultado += 'mil';
            } else {
                resultado += numeroPorExtenso(milhares) + ' mil';
            }
            num %= 1000;
            if (num > 0) resultado += ' e ';
        }

        if (num >= 100) {
            if (num === 100) {
                resultado += 'cem';
            } else {
                resultado += centenas[Math.floor(num / 100)];
            }
            num %= 100;
            if (num > 0) resultado += ' e ';
        }

        if (num >= 10 && num < 20) {
            resultado += especiais[num - 10];
        } else if (num >= 10) {
            resultado += dezenas[Math.floor(num / 10)];
            num %= 10;
            if (num > 0) resultado += ' e ';
        }

        if (num > 0 && num < 10) {
            resultado += unidades[num];
        }

        return resultado;
    }

    let extenso = numeroPorExtenso(inteiro);
    extenso += ' reais';

    if (centavos > 0) {
        extenso += ' e ' + numeroPorExtenso(centavos) + ' centavos';
    }

    return extenso;
}

function calcularDataFim(dataInicio, meses) {
    const data = new Date(dataInicio);
    data.setMonth(data.getMonth() + parseInt(meses));
    return data;
}

function gerarContrato() {
    const locatarioNome = document.getElementById('locatarioNome').value;
    const locatarioCPF = document.getElementById('locatarioCPF').value;
    const locatarioRG = document.getElementById('locatarioRG').value;

    const imovelEndereco = document.getElementById('imovelEndereco').value;
    const imovelCidade = document.getElementById('imovelCidade').value;
    const imovelUF = document.getElementById('imovelUF').value;
    const imovelCidadeCadastral = document.getElementById('imovelCidadeCadastral').value;
    const imovelInscricaoCadastral = document.getElementById('imovelInscricaoCadastral').value;
    const imovelCNPJ = document.getElementById('imovelCNPJ').value;

    const dataAssinatura = document.getElementById('dataAssinatura').value;
    const dataInicio = document.getElementById('dataInicio').value;
    const duracaoMeses = document.getElementById('duracaoMeses').value;
    const valorAluguel = document.getElementById('valorAluguel').value;
    const diaPagamento = document.getElementById('diaPagamento').value;
    const indiceReajuste = document.getElementById('indiceReajuste').value;

    const bancoAgencia = document.getElementById('bancoAgencia').value;
    const bancoConta = document.getElementById('bancoConta').value;
    const bancoPIX = document.getElementById('bancoChavePIX').value;
    const bancoFavorecido = document.getElementById('bancoFavorecido').value;

    const test1Nome = document.getElementById('test1Nome').value;
    const test1CPF = document.getElementById('test1CPF').value;
    const test2Nome = document.getElementById('test2Nome').value;
    const test2CPF = document.getElementById('test2CPF').value;

    if (!locatarioNome || !locatarioCPF || !locatarioRG) {
        alert('Por favor, preencha todos os dados do locatário.');
        return;
    }

    if (!imovelEndereco || !imovelCidade || !imovelInscricaoCadastral) {
        alert('Por favor, preencha todos os dados do imóvel.');
        return;
    }

    if (!dataAssinatura || !dataInicio || !valorAluguel) {
        alert('Por favor, preencha todos os dados do contrato.');
        return;
    }

    const valorAluguelFormatado = valorAluguel;
    const valorAluguelExtenso = converterValorPorExtenso(valorAluguel);

    document.getElementById('contratoLocatario').innerHTML = 
        `${locatarioNome.toUpperCase()}, brasileiro, portador do RG nº ${locatarioRG}, inscrito no CPF sob o nº ${formatarCPF(locatarioCPF)}.`;

    document.getElementById('contratoImovel').innerHTML = 
        `Imóvel residencial localizado na ${imovelEndereco.toUpperCase()}, ${imovelCidadeCadastral || imovelCidade.toUpperCase()}/${imovelUF} - CNPJ ${imovelCNPJ} (Inscrição Imobiliária nº ${imovelInscricaoCadastral}).`;

    document.getElementById('contratoEndereco').innerHTML = 
        `<strong>${imovelEndereco.toUpperCase()}</strong>, ${imovelCidadeCadastral || imovelCidade.toUpperCase()}/${imovelUF}`;

    document.getElementById('contratoCNPJ').textContent = imovelCNPJ;
    document.getElementById('contratoInscricao').textContent = imovelInscricaoCadastral;
    document.getElementById('contratoDuracao').textContent = `${duracaoMeses} (${obterMesPorExtenso(parseInt(duracaoMeses))})`;
    document.getElementById('contratoDataInicio').textContent = formatarData(dataInicio);

    const dataFim = calcularDataFim(dataInicio, duracaoMeses);
    const dataFimFormatada = formatarData(dataFim.toISOString().split('T')[0]);
    document.getElementById('contratoDataFim').textContent = dataFimFormatada;

    document.getElementById('contratoIndice').textContent = indiceReajuste;
    document.getElementById('contratoValorAluguel').textContent = valorAluguelFormatado;
    document.getElementById('contratoValorAluguelExtenso').textContent = valorAluguelExtenso;
    document.getElementById('contratoDiaPagamento').textContent = diaPagamento;

    document.getElementById('contratoAgencia').textContent = bancoAgencia;
    document.getElementById('contratoConta').textContent = bancoConta;
    document.getElementById('contratoPIX').textContent = bancoPIX;
    document.getElementById('contratoFavorecido').textContent = bancoFavorecido;

    const valorCaucao = valorAluguel;
    document.getElementById('contratoValorCaucao').textContent = valorCaucao;
    document.getElementById('contratoValorCaucaoExtenso').textContent = converterValorPorExtenso(valorCaucao);

    document.getElementById('contratoDataAssinatura').textContent = formatarData(dataAssinatura);

    document.getElementById('assinaturaLocatarioNome').textContent = locatarioNome.toUpperCase();
    document.getElementById('assinaturaLocatarioCPF').textContent = formatarCPF(locatarioCPF);

    document.getElementById('test1NomeContrato').textContent = test1Nome;
    document.getElementById('test1CPFContrato').textContent = test1CPF ? formatarCPF(test1CPF) : '';
    document.getElementById('test2NomeContrato').textContent = test2Nome;
    document.getElementById('test2CPFContrato').textContent = test2CPF ? formatarCPF(test2CPF) : '';

    document.querySelector('.form-section').parentElement.style.display = 'none';
    document.getElementById('contratoOutput').style.display = 'block';
}

function voltarFormulario() {
    document.querySelector('.form-section').parentElement.style.display = 'block';
    document.getElementById('contratoOutput').style.display = 'none';
}

function limparFormulario() {
    if (confirm('Deseja realmente limpar todos os campos?')) {
        document.querySelectorAll('input[type="text"], input[type="date"], input[type="number"]').forEach(input => {
            if (!input.disabled) {
                input.value = '';
            }
        });
        document.getElementById('duracaoMeses').value = '12';
        document.getElementById('diaPagamento').value = '1';
        document.getElementById('indiceReajuste').value = 'IPCA/IGBE';
        document.getElementById('imovelUF').value = 'SC';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const cpfInputs = ['locatarioCPF', 'test1CPF', 'test2CPF'];
    cpfInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 11) value = value.slice(0, 11);
                if (value.length > 9) {
                    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
                } else if (value.length > 6) {
                    value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
                } else if (value.length > 3) {
                    value = value.replace(/(\d{3})(\d{1,3})/, '$1.$2');
                }
                e.target.value = value;
            });
        }
    });

    const valorInput = document.getElementById('valorAluguel');
    if (valorInput) {
        valorInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                const num = parseInt(value) / 100;
                value = num.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
            }
            e.target.value = value;
        });
    }

    const dataInputs = ['dataAssinatura', 'dataInicio'];
    dataInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            const today = new Date().toISOString().split('T')[0];
            input.value = input.value || today;
        }
    });
});
