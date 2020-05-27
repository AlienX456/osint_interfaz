import React, { useState } from 'react';
import './App.css';


function App() {


  const titulo = 'Metamodelo para vinculación de recursos educativos abiertos mediante especificaciones LOD y basado en principios de confianza';
  const subtitulo = 'Interfaz de Consulta';
  const objetos_busqueda = {0:'Ninguno',1:'Autor',2:'Institución',3:'Grupo',4:'Título',5:'Materias',6:'P. claves',7:'Colección',8:'Subcomunidad'};

  const [header, setHeader] = useState(null);

  const [resultado, setResultado] = useState(null);

  const [resultado_filtrado, setResultadoFitrado] = useState(resultado);
  


  function consultarRecursos(e){
    obtenerRecursos(null);
  }




  function complementarDatos(resultado){

    let temp = resultado;


    for (let [index,fila] of temp['results']['bindings'].entries()){

      let fila_ordenada = {};

      for (let header of temp['head']['vars']){
        if (!(header in fila)){
          fila[header] = 
          {
              "type": "literal",
              "value": "Valor no encontrado"
          }
          ;
        }
      }

      Object.keys(fila).sort().forEach(function(key) {
        fila_ordenada[key] = fila[key];
      });

      temp['results']['bindings'][index] = fila_ordenada;
    }

    temp['head']['vars'].sort();

    return temp;

  }




  function obtenerRecursos(termino){



    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");


    let consulta_sparql = ""+
    "PREFIX dct: <http://purl.org/dc/terms/>\n"+
    "PREFIX dcterm: <http://purl.org/dc/terms/>\n"+
    "prefix void: <http://rdfs.org/ns/void#>\n"+
    "prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n"+
    "prefix xsd: <http://www.w3.org/2001/XMLSchema#>\n"+
    "prefix dcterms: <http://purl.org/dc/terms/>\n"+
    "prefix bibo: <http://purl.org/ontology/bibo/>\n"+
    "prefix foaf: <http://xmlns.com/foaf/0.1/>\n"+
    "prefix dc: <http://purl.org/dc/elements/1.1/>\n"+
    "prefix dspace: <http://digital-repositories.org/ontologies/dspace/0.1.0#>\n"+
    "SELECT *\n"+
    "WHERE {\n"+
    "  GRAPH ?graph {\n"+
    "    ?resource dcterms:title ?title .\n"+
    "     OPTIONAL {?resource dcterms:creator ?author} .\n"+
    "     OPTIONAL {?resource dc:creator ?creator} .\n"+
    "     OPTIONAL {?resource dcterms:date ?date} .\n"+
    "     OPTIONAL {?resource dcterms:alternative ?alternative} .\n"+
    "     OPTIONAL {?resource bibo:uri ?uri} .\n"+
    "     OPTIONAL {?resource dcterms:created ?created} .\n"+
    "     OPTIONAL {?resource dc:advisor ?advisor} .\n"+
    "     OPTIONAL {?resource dc:publisher ?publisher} .\n"+
    "     OPTIONAL {?resource dcterms:bibliographicCitation ?bibCitation} .\n"+
    "     OPTIONAL {?resource dcterms:isPartOf ?partof} .\n"+
    "     OPTIONAL {?resource bibo:doi ?doi} .\n"+
    "     OPTIONAL {?resource bibo:handle ?handle} .\n"+
    "     OPTIONAL {?resource bibo:issn ?issn} .\n"+
    "     OPTIONAL {?resource bibo:sici ?sici} .\n"+
    "     OPTIONAL {?resource dc:language ?language} .\n"+
    "     OPTIONAL {?resource dc:subject ?subject} .\n"+
    "     OPTIONAL {?resource dcterms:abstract ?abstract} .\n"+
    "     OPTIONAL {?resource dc:sponsorship ?sponsorship} .\n"+
    "     OPTIONAL {?resource dcterms:description ?description} .\n"+
    "     OPTIONAL {?resource dcterms:issued ?issued} .\n"+
    "   } }";


    let body = 'query='+ encodeURIComponent(consulta_sparql);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: body,
      redirect: 'follow'
    };

    fetch("http://200.69.103.29:26237/fuseki/dspace/sparql", requestOptions)
      .then(response => response.text())
      .then(result => 
        {
          let temp = complementarDatos(JSON.parse(result));
          setHeader(temp['head']['vars']);
          setResultado(temp['results']['bindings']);
          setResultadoFitrado(temp['results']['bindings']);
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
                  Término a consultar
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
        
        <div className="flex overflow-auto h-128 border-4">
          { Boolean(resultado_filtrado)
            ?
            <table className="table-fixed mx-auto my-auto border-2">
              <thead className="bg-gray-400">
                <tr>

                  {header.map
                    (
                      (head) =><th className="px-4 py-2 w-64 border-2">{head.toUpperCase()}</th>
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
                          ([key, value]) => 
                          <td className="border px-4 py-2" key={key}>
                            <div className="overflow-auto h-32 w-64">
                            {value['value']}
                            </div>
                            </td>
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
