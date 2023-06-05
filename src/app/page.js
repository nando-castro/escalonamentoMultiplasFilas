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
      tempoExecucao: 3,
      color: "pink",
    },
  ];

  const fila0 = []; //prioridade 0
  const fila1 = []; //prioridade 1
  const processos = []; //ordem de execucao
  const filaRR = []; //lista de processos para RR
  const tempo = []; //tempo

  //RR
  const quantum = 2; //fatia de tempo para execucao

  /*FILA 0 = FIFO && FILA 1 = RR */
  const verAlgortimo = () => {
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
    fila1.map((processo) => {
      // processos.push(processo);
    });
  }

  function ordenaProcessosRR() {
    //RR
    for (let i = 0; i < fila1.length; i++) {
      let novoArray = [fila1[i]];
      filaRR.push(novoArray);
      for (let j = 0; j < filaRR[i].tempoExecucao; j++) {
        let newArray = [];
        newArray.push(filaRR[i][j]);
        console.log("newArray", newArray);
      }
    }
  }

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

  //executar
  verAlgortimo();
  ordenaProcessosRR();
  ordenaProcessos();

  console.log("Fila1", fila1);
  console.log("FilaRR", filaRR);

  return (
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
  );
}
