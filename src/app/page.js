"use client";

export default function Home() {
  const dados = [
    {
      id: 1,
      nome: "A",
      prioridade: 0,
      tempoEntrada: 0,
      tempoExecucao: 5,
    },
    {
      id: 2,
      nome: "B",
      prioridade: 0,
      tempoEntrada: 0,
      tempoExecucao: 4,
    },
    {
      id: 3,
      nome: "C",
      prioridade: 1,
      tempoEntrada: 0,
      tempoExecucao: 3,
    },
    {
      id: 4,
      nome: "D",
      prioridade: 0,
      tempoEntrada: 3,
      tempoExecucao: 5,
    },
  ];

  const fila0 = []; //prioridade 0
  const fila1 = []; //prioridade 1
  const processos = []; //ordem de execucao
  
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
      processos.push(processo);
    });
  }

  //FIFO - RENDERIZAR PROCESSOS
  const renderFila0 = () => {
    return fila0.map((processo) => {
      return (
        <div key={processo.id}>
          <p style={{ border: "1px solid #000", background: "red" }}>
            {processo.nome}
          </p>
        </div>
      );
    });
  };

  //renderiza os processos na tela
  function renderProcessos() {
    return processos.map((i) => {
      return (
        <div key={i.id}>
          <p style={{ border: "1px solid #000", background: "red" }}>
            {i.nome}
          </p>
        </div>
      );
    });
  }

  //renderiza os processos para cada tempo de execucao
  function renderProcessosTempo() {
    return processos.map((processo) => {
      return (
        <div
          key={Math.random()}
          style={{ width: "100%", display: "flex", flexDirection: "row" }}
        >
          <p
            style={{
              width: "100%",
              padding: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid #000",
              background: "cyan",
            }}
          >
            {processo.nome}
          </p>
        </div>
      );
    });
  }

  verAlgortimo();
  ordenaProcessos();

  

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
          {renderProcessosTempo()}
        </div>
      </div>
    </main>
  );
}
