function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11) return cpf;
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function formatarData(dataStr) {
    if (!dataStr) return '';
    const parts = dataStr.split('-');
    return parts[2] + '/' + parts[1] + '/' + parts[0];
}

function obterMesPorExtenso(meses) {
    const mapa = {1:'um',2:'dois',3:'três',4:'quatro',5:'cinco',6:'seis',7:'sete',8:'oito',9:'nove',10:'dez',11:'onze',12:'doze'};
    return mapa[meses] || meses;
}

function converterValorPorExtenso(valor) {
    valor = valor.replace(/[^\d,]/g, '').replace(',', '.');
    var num = parseFloat(valor);
    if (isNaN(num)) return 'zero reais';

    var inteiro = Math.floor(num);
    var centavos = Math.round((num - inteiro) * 100);

    var unidades = ['','um','dois','três','quatro','cinco','seis','sete','oito','nove'];
    var dezenas = ['','dez','vinte','trinta','quarenta','cinquenta','sessenta','setenta','oitenta','noventa'];
    var especiais = ['','onze','doze','treze','quatorze','quinze','dezesseis','dezessete','dezoito','dezenove'];
    var centenas = ['','cento','duzentos','trezentos','quatrocentos','quinhentos','seiscentos','setecentos','oitocentos','novecentos'];

    function extenso(n) {
        if (n === 0) return 'zero';
        var r = '';
        if (n >= 100) {
            if (n === 100) return 'cem';
            r += centenas[Math.floor(n / 100)];
            n %= 100;
            if (n > 0) r += ' e ';
        }
        if (n >= 10 && n < 20) {
            r += especiais[n - 10];
        } else {
            if (n >= 10) { r += dezenas[Math.floor(n / 10)]; n %= 10; if (n > 0) r += ' e '; }
            if (n > 0) r += unidades[n];
        }
        return r;
    }

    var resultado = extenso(inteiro) + ' reais';
    if (centavos > 0) resultado += ' e ' + extenso(centavos) + ' centavos';
    return resultado;
}

function gerarContrato() {
    var locatarioNome = document.getElementById('locatarioNome').value.trim();
    var locatarioCPF = document.getElementById('locatarioCPF').value.trim();
    var locatarioRG = document.getElementById('locatarioRG').value.trim();

    var imovelEndereco = document.getElementById('imovelEndereco').value.trim();
    var imovelCidade = document.getElementById('imovelCidade').value.trim();
    var imovelUF = document.getElementById('imovelUF').value;
    var imovelCidadeCadastral = document.getElementById('imovelCidadeCadastral').value.trim();
    var imovelInscricaoCadastral = document.getElementById('imovelInscricaoCadastral').value.trim();
    var imovelCEP = document.getElementById('imovelCEP').value.trim();

    var dataAssinatura = document.getElementById('dataAssinatura').value;
    var dataInicio = document.getElementById('dataInicio').value;
    var duracaoMeses = document.getElementById('duracaoMeses').value;
    var valorAluguel = document.getElementById('valorAluguel').value.trim();
    var diaPagamento = document.getElementById('diaPagamento').value;
    var indiceReajuste = document.getElementById('indiceReajuste').value;

    var bancoAgencia = document.getElementById('bancoAgencia').value;
    var bancoConta = document.getElementById('bancoConta').value;
    var bancoPIX = document.getElementById('bancoChavePIX').value;
    var bancoFavorecido = document.getElementById('bancoFavorecido').value;

    var test1Nome = document.getElementById('test1Nome').value;
    var test1CPF = document.getElementById('test1CPF').value;
    var test2Nome = document.getElementById('test2Nome').value;
    var test2CPF = document.getElementById('test2CPF').value;

    if (!locatarioNome || !locatarioCPF || !locatarioRG) {
        alert('Preencha os dados do Locatário (Nome, CPF e RG).');
        return;
    }
    if (!imovelEndereco || !imovelCidade) {
        alert('Preencha os dados do Imóvel (Endereço e Cidade).');
        return;
    }
    if (!valorAluguel) {
        alert('Preencha o valor do aluguel.');
        return;
    }

    var cidadeCadastral = imovelCidadeCadastral || imovelCidade.toUpperCase();

    document.getElementById('contratoLocatario').innerHTML =
        locatarioNome.toUpperCase() + ', brasileiro, portador do RG nº ' + locatarioRG + ', inscrito no CPF sob o nº ' + formatarCPF(locatarioCPF) + '.';

    document.getElementById('contratoImovel').innerHTML =
        'Imóvel residencial localizado na ' + imovelEndereco.toUpperCase() + ', ' + cidadeCadastral + '/' + imovelUF + (imovelCEP ? ' - CEP ' + imovelCEP : '') + (imovelInscricaoCadastral ? ' (Inscrição Imobiliária nº ' + imovelInscricaoCadastral + ')' : '') + '.';

    document.getElementById('contratoEndereco').innerHTML =
        '<strong>' + imovelEndereco.toUpperCase() + '</strong>, ' + cidadeCadastral + '/' + imovelUF;

    var elCEP = document.getElementById('contratoCEP');
    if (elCEP) elCEP.textContent = imovelCEP || '___________';

    var elInscricao = document.getElementById('contratoInscricao');
    if (elInscricao) elInscricao.textContent = imovelInscricaoCadastral || '___________';

    document.getElementById('contratoDuracao').textContent = duracaoMeses + ' (' + obterMesPorExtenso(parseInt(duracaoMeses)) + ')';
    document.getElementById('contratoDataInicio').textContent = formatarData(dataInicio);

    var dataFim = new Date(dataInicio);
    dataFim.setMonth(dataFim.getMonth() + parseInt(duracaoMeses));
    document.getElementById('contratoDataFim').textContent = formatarData(dataFim.toISOString().split('T')[0]);

    document.getElementById('contratoIndice').textContent = indiceReajuste;
    document.getElementById('contratoValorAluguel').textContent = valorAluguel;
    document.getElementById('contratoValorAluguelExtenso').textContent = valorAluguel;
    document.getElementById('contratoDiaPagamento').textContent = diaPagamento;

    document.getElementById('contratoAgencia').textContent = bancoAgencia;
    document.getElementById('contratoConta').textContent = bancoConta;
    document.getElementById('contratoPIX').textContent = bancoPIX;
    document.getElementById('contratoFavorecido').textContent = bancoFavorecido;

    document.getElementById('contratoValorCaucao').textContent = valorAluguel;
    document.getElementById('contratoValorCaucaoExtenso').textContent = valorAluguel;

    document.getElementById('contratoDataAssinatura').textContent = formatarData(dataAssinatura);

    document.getElementById('assinaturaLocatarioNome').textContent = locatarioNome.toUpperCase();
    document.getElementById('assinaturaLocatarioCPF').textContent = formatarCPF(locatarioCPF);

    document.getElementById('test1NomeContrato').textContent = test1Nome || '_______________________';
    document.getElementById('test1CPFContrato').textContent = test1CPF ? formatarCPF(test1CPF) : '_____________';
    document.getElementById('test2NomeContrato').textContent = test2Nome || '_______________________';
    document.getElementById('test2CPFContrato').textContent = test2CPF ? formatarCPF(test2CPF) : '_____________';

    document.querySelectorAll('.form-section, header, .btn-group').forEach(function(el) {
        el.style.display = 'none';
    });
    document.getElementById('contratoOutput').style.display = 'block';
    window.scrollTo(0, 0);
}

function voltarFormulario() {
    document.querySelectorAll('.form-section, header, .btn-group').forEach(function(el) {
        el.style.display = '';
    });
    document.getElementById('contratoOutput').style.display = 'none';
    window.scrollTo(0, 0);
}

function limparFormulario() {
    if (confirm('Deseja realmente limpar todos os campos?')) {
        document.querySelectorAll('input[type="text"], input[type="date"], input[type="number"]').forEach(function(input) {
            if (!input.disabled) input.value = '';
        });
        document.getElementById('duracaoMeses').value = '12';
        document.getElementById('diaPagamento').value = '1';
        document.getElementById('indiceReajuste').value = 'IPCA/IGBE';
        document.getElementById('imovelUF').value = 'SC';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    ['locatarioCPF', 'test1CPF', 'test2CPF'].forEach(function(id) {
        var input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', function(e) {
                var v = e.target.value.replace(/\D/g, '');
                if (v.length > 11) v = v.slice(0, 11);
                if (v.length > 9) v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
                else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
                else if (v.length > 3) v = v.replace(/(\d{3})(\d{1,3})/, '$1.$2');
                e.target.value = v;
            });
        }
    });

    var valorInput = document.getElementById('valorAluguel');
    if (valorInput) {
        valorInput.addEventListener('input', function(e) {
            var v = e.target.value.replace(/\D/g, '');
            if (v.length > 0) {
                var num = parseInt(v) / 100;
                e.target.value = num.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
            }
        });
    }

    var cepInput = document.getElementById('imovelCEP');
    if (cepInput) {
        cepInput.addEventListener('input', function(e) {
            var v = e.target.value.replace(/\D/g, '');
            if (v.length > 5) v = v.replace(/(\d{5})(\d{1,3})/, '$1-$2');
            e.target.value = v;
        });
    }

    ['dataAssinatura', 'dataInicio'].forEach(function(id) {
        var input = document.getElementById(id);
        if (input && !input.value) {
            input.value = new Date().toISOString().split('T')[0];
        }
    });
});
