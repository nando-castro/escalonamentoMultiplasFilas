"use client";

import { useState } from "react";

export default function Home() {
  const dados = [
    {
      id: 1,
      nome: "A",
      prioridade: 0,
      tempoEntrada: 0,
      tempoExecucao: 5,
      color: "red",
    },
    {
      id: 2,
      nome: "B",
      prioridade: 0,
      tempoEntrada: 0,
      tempoExecucao: 4,
      color: "blue",
    },
    {
      id: 3,
      nome: "C",
      prioridade: 1,
      tempoEntrada: 0,
      tempoExecucao: 3,
      color: "green",
    },
    {
      id: 4,
      nome: "D",
      prioridade: 0,
      tempoEntrada: 3,
      tempoExecucao: 5,
      color: "yellow",
    },
    {
      id: 5,
      nome: "E",
      prioridade: 1,
      tempoEntrada: 3,
      tempoExecucao: 4,
      color: "pink",
    },
  ];

  const tempo = []; //tempo
  const fila0 = []; //prioridade 0
  const fila1 = []; //prioridade 1
  const filaRR = []; //lista de processos para RR
  const processos = []; //ordem de execucao dos processos
  const quantum = 2; //fatia de tempo para execucao

  const [executar, setExecutar] = useState(false);

  /*---------------------LÓGICA PARA EXECUÇÃO DOS ALGORITMOS-------------------------*/

  /*FILA 0 = FIFO && FILA 1 = RR */
  const verAlgoritmo = () => {
    dados.map((dado) => {
      if (dado.prioridade === 0) {
        fila0.push(dado);
      } else {
        fila1.push(dado);
      }
    });
  };

  //coloca os processos na fila de execucao
  function ordenaProcessos() {
    //FIFO
    fila0.map((processo) => {
      for (let i = 0; i < processo.tempoExecucao; i++) {
        processos.push(processo);
      }
    });
    //RR
    ordenaProcessosRR();
  }

  function ordenaProcessosRR() {
    //RR
    for (let i = 0; i < fila1.length; i++) {
      let novoArray = [fila1[i]];
      filaRR.push(novoArray);
    }

    //cria um array com os processos repetidos de acordo com o tempo de execucao
    const novaFilaRR = filaRR.map((processo) => {
      for (let i = 0; i < processo[0].tempoExecucao - 1; i++) {
        processo.push(processo[0]);
      }
      return processo;
    });

    //Reorganiza a filaRR para chamar os processos em rr para a fila de execução na CPu
    while (novaFilaRR.length > 0) {
      for (let i = 0; i < novaFilaRR.length; i++) {
        let array = novaFilaRR[i];
        if (array.length > 1) {
          let elementosRemovidos = array.splice(
            array.length - quantum,
            quantum
          );
          processos.push(...elementosRemovidos);
          console.log("Elementos removidos:", elementosRemovidos);
        } else if (array.length === 1) {
          let elementoRemovido = array.pop();
          processos.push(elementoRemovido);
          console.log("Elemento removido:", elementoRemovido);
        } else {
          novaFilaRR.splice(i, 1);
          i--;
        }
      }
    }
  }

  /* ---------------------FUNÇÕES DE RENDERIZAÇÃO-------------------------- */

  //FIFO - RENDERIZAR PROCESSOS - FILA 0
  const renderFila0 = () => {
    return fila0.map((processo) => {
      return (
        <div key={processo.id}>
          <p
            style={{
              width: "50px",
              padding: "2px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid #000",
              background: processo.color,
            }}
          >
            {processo.nome}
          </p>
        </div>
      );
    });
  };

  //RR - RENDERIZAR PROCESSOS - FILA 1
  const renderFila1 = () => {
    return fila1.map((processo) => {
      return (
        <div key={processo.id}>
          <p
            style={{
              width: "50px",
              padding: "2px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid #000",
              background: processo.color,
            }}
          >
            {processo.nome}
          </p>
        </div>
      );
    });
  };

  //renderiza os processos para cada tempo de execucao
  function renderProcessosTempo() {
    return processos.map((processo) => {
      return (
        <div
          key={Math.random()}
          style={{ display: "flex", flexDirection: "row" }}
        >
          <p
            style={{
              width: "50px",
              padding: "2px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid #000",
              background: processo.color,
            }}
          >
            {processo.nome}
          </p>
        </div>
      );
    });
  }

  //renderiza o tempo de execucao
  function renderTempoExecucao() {
    for (let i = 0; i < processos.length; i++) {
      tempo.push(i);
    }
    return tempo.map((t) => {
      return (
        <div
          key={Math.random()}
          style={{
            width: "50px",
            padding: "2px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #000",
          }}
        >
          {t}
        </div>
      );
    });
  }

  //executar as duas funções
  verAlgoritmo();
  ordenaProcessos();

  return (
    <div>
      {executar ? (
        <main style={{ width: "100%", height: "100%", padding: "30px" }}>
          <p style={{ padding: "10px" }}>ESCALONAMENTO - MÚLTIPLAS FILAS</p>
          <div
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <span>Diagrama de execucao na CPU</span>
            <div
              style={{
                border: "1px solid #000",
                display: "flex",
              }}
            >
              <p
                style={{
                  width: "100px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Tempo
              </p>
              {renderTempoExecucao()}
            </div>
            <div
              style={{
                border: "1px solid #000",
                display: "flex",
              }}
            >
              <p
                style={{
                  width: "100px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Processos
              </p>
              {renderProcessosTempo()}
            </div>
          </div>
          <div>
            <h3>Fila de Processos</h3>
            <p>Fila de prioridade 0 - FIFO</p>
            <div style={{ display: "flex" }}>{renderFila0()}</div>
            <p>Fila de prioridade 1 - RR</p>
            <div style={{ display: "flex" }}>{renderFila1()}</div>
          </div>
        </main>
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            padding: "30px",
            display: "flex",
            // alignItems: "center",
            // justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <button
            onClick={() => setExecutar(true)}
            style={{
              width: "100px",
              height: "30px",
            }}
          >
            Executar
          </button>
          {/* <img alt="manoelflamenguista" src="https://pbs.twimg.com/profile_images/1619947440026619905/Bl5rQH58_400x400.jpg" width={200} /> */}
          <div style={{ marginTop: "50px" }}>
            <h3>Dados dos Processos</h3>
            {dados.map((dado) => {
              return (
                <div
                  key={dado.id}
                  style={{
                    display: "flex",
                    gap: "30px",
                  }}
                >
                  <p>Processo: {dado.nome}</p>
                  <p>Tempo de execução: {dado.tempoExecucao}</p>
                  <p>Prioridade: {dado.prioridade}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
