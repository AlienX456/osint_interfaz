import React, { useState } from 'react';
import './App.css';


function App() {


  const titulo = 'Metamodelo para vinculación de recursos educativos abiertos mediante especificaciones LOD y basado en principios de confianza';
  const subtitulo = 'Interfaz de Consulta';
  const objetos_busqueda = {1:'Autor',2:'Institución',3:'Grupo',4:'Título',5:'Materias',6:'P. claves',7:'Colección',8:'Subcomunidad'};

  const [header, setHeader] = useState(null);

  const [resultado, setResultado] = useState(null);

  const [resultado_filtrado, setResultadoFitrado] = useState(resultado);
  


  function consultarRecursos(e){
    obtenerRecursos(null);
  }

  function obtenerRecursos(termino){
    var myHeaders = new Headers();
//    myHeaders.append("User-Agent", "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:76.0) Gecko/20100101 Firefox/76.0");
    myHeaders.append("Accept", "application/sparql-results+json,*/*;q=0.9");
    myHeaders.append("Accept-Language", "en-US,en;q=0.5");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    myHeaders.append("X-Requested-With", "XMLHttpRequest");
    myHeaders.append("Origin", "http://200.69.103.29:26237");
    myHeaders.append("Connection", "keep-alive");
    myHeaders.append("Referer", "http://200.69.103.29:26237/fuseki/dataset.html?tab=query&ds=/dspace");

    var ejemplo = "query=PREFIX+dct%3A+%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Fterms%2F%3E%0APREFIX+dcterm%3A+%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Fterms%2F%3E%0Aprefix+void%3A++%3Chttp%3A%2F%2Frdfs.org%2Fns%2Fvoid%23%3E+%0Aprefix+rdf%3A+++%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E+%0Aprefix+xsd%3A+++%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E+%0Aprefix+dcterms%3A+%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Fterms%2F%3E+%0Aprefix+bibo%3A++%3Chttp%3A%2F%2Fpurl.org%2Fontology%2Fbibo%2F%3E+%0Aprefix+foaf%3A++%3Chttp%3A%2F%2Fxmlns.com%2Ffoaf%2F0.1%2F%3E+%0Aprefix+dc%3A++++%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%3E+%0Aprefix+dspace%3A+%3Chttp%3A%2F%2Fdigital-repositories.org%2Fontologies%2Fdspace%2F0.1.0%23%3E+%0A%0A%0A%0ASELECT++%3Ftitle+%3Fauthor+%3Fdate+%3Fgraph%0A%0AWHERE+%7B+%0A++GRAPH++%3Fgraph%0A++%7B%0A+%0A++++++%3Fresource+dcterms%3Atitle+%3Ftitle+.%0A++++++%3Fresource+dcterms%3Acontributor+%3Fauthor+.%0A++++++OPTIONAL+%7B%3Fresource+dcterms%3Adate+%3Fdate%7D+.%0A%7D%0A++%7D";

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: ejemplo,
      redirect: 'follow'
    };

    fetch("http://200.69.103.29:26237/fuseki/dspace/sparql", requestOptions)
      .then(response => response.text())
      .then(result => 
        {
          setHeader(JSON.parse(result)['head']['vars']);
          setResultado(JSON.parse(result)['results']['bindings']);
          setResultadoFitrado(JSON.parse(result)['results']['bindings']);
        })
      .catch(error => console.log('error', error));

  }



  function filtrarResultados(e) {

    let arreglo_filtrado = [];


    for (let item of resultado){

      let elementos_fila = Object.values(item);

      let verificado = false;

      for (let child of elementos_fila){

        if (child['value'].toLowerCase().includes(e.target.value.toLowerCase())){
          verificado = true;
        } 
      }

      if (verificado) {
        arreglo_filtrado.push(item)
      }

    }

    setResultadoFitrado(arreglo_filtrado);

    }




  return (
    <div>


      <div className="flex flex-wrap mt-8 mb-4">
        <div className="w-3/4 mx-auto my-auto text-center text-xl shadow-2xl bg-white shadow-md rounded px-8 pt-12 pb-12">
            <p>{titulo}</p>
            <p>{subtitulo}</p>
        </div>
      </div>




        <div className="flex flex-wrap py-8">
          <div className="flex w-3/4 mx-auto px-4 text-center text-xl py-8 bg-white shadow-md rounded px-8 pt-6 pb-8">
              <div className="w-2/4">
                <label className="mx-auto block mb-4">
                  <input className="mr-2 leading-tight" type="checkbox"/>
                  <span className="text-sm">
                    Habilitar consulta filtrada
                  </span>
                </label>
                <label className="mb-1 md:mb-0 pr-4">
                  Buscar por
                </label>
                  <select className="text-center block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                    {Object.entries(objetos_busqueda).map(
                      ([key, value]) => <option key={key} value={value} >{value}</option>
                    )}
                  </select>
                <label className="mb-1 md:mb-0 pr-4">
                  Termino a consultar
                </label>
                  <input className=" text-center bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"/>
              </div>
              <div className="w-2/4 mx-auto my-auto">
                <button className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button" onClick={consultarRecursos}>
                  Consultar Recursos
                </button>
              </div>
            </div>
        </div>
      
      <div className="flex flex-wrap py-4">
        <div className="w-3/4 mx-auto text-center text-xl py-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

        <div className="flex flex-row-reverse mb-16">
          <div className="lg:w-3/4">
            <label className="mb-1 md:mb-0 pr-4">
              Escriba una palabra para filtrar :
            </label>
              <input className="text-center bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" onChange={filtrarResultados} />
          </div>
        </div>
        
        <div className="flex overflow-auto">
          { Boolean(resultado_filtrado)
            ?
            <table className="table-auto mx-auto my-auto border-2">
              <thead>
                <tr>

                  {header.map
                    (
                      (head) =><th className="px-4 py-2">{head}</th>
                    )
                  }
                </tr>
              </thead>
              <tbody className="text-sm">
                {
                  resultado_filtrado.map(
                    (elemento) =>
                    <tr> 
                        {Object.entries(elemento).map(
                          ([key, value]) => <td className="border px-4 py-2" key={key}>{value['value']}</td>
                        )}
                    </tr>
                  )
                }
              </tbody>
            </table>
            :
            <div className="mx-auto">
              No hay datos que cargar
            </div>
          }
        </div>


        </div>
      </div>



    </div>
  );
}

export default App;
