/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React, { useState } from 'react';
import './App.css';


function App() {
  const temp_json = 
    {
      "head": {
        "vars": [
          "title",
          "author",
          "date",
          "graph"
        ]
      },
      "results": {
        "bindings": [
          {
            "title": {
              "type": "literal",
              "value": "El blog interactivo para la clase de matemáticas"
            },
            "author": {
              "type": "literal",
              "value": "Diseño::Validador Educativo - Teresa Rojas"
            },
            "date": {
              "type": "literal",
              "datatype": "http://www.w3.org/2001/XMLSchema#dateTime",
              "value": "2020-02-11"
            },
            "graph": {
              "type": "uri",
              "value": "http://localhost:8080/rdf/resource/123456789/14"
            }
          },
          {
            "title": {
              "type": "literal",
              "value": "El blog interactivo para la clase de matemáticas"
            },
            "author": {
              "type": "literal",
              "value": "Contenido::Proveedor - Catalina Rojas"
            },
            "date": {
              "type": "literal",
              "datatype": "http://www.w3.org/2001/XMLSchema#dateTime",
              "value": "2020-02-11"
            },
            "graph": {
              "type": "uri",
              "value": "http://localhost:8080/rdf/resource/123456789/14"
            }
          },
          {
            "title": {
              "type": "literal",
              "value": "Euthanasia of Raccoon City"
            },
            "author": {
              "type": "literal",
              "value": "https://open.spotify.com/album/2f8psgefNAeQztCpBnARL4"
            },
            "graph": {
              "type": "uri",
              "value": "http://localhost:8080/rdf/resource/123456789/12"
            }
          },
          {
            "title": {
              "type": "literal",
              "value": "Resident Evil: La Conspiración Umbrella"
            },
            "author": {
              "type": "literal",
              "value": "Design::Educational Validator - Teresa Rojas"
            },
            "graph": {
              "type": "uri",
              "value": "http://localhost:8080/rdf/resource/123456789/16"
            }
          },
          {
            "title": {
              "type": "literal",
              "value": "Concepto de Punteros en C"
            },
            "author": {
              "type": "literal",
              "value": "https://open.spotify.com/album/2f8psgefNAeQztCpBnARL4"
            },
            "graph": {
              "type": "uri",
              "value": "http://localhost:8080/rdf/resource/123456789/13"
            }
          }
        ]
      }
    }





  const titulo = 'Metamodelo para vinculación de recursos educativos abiertos mediante especificaciones LOD y basado en principios de confianza';
  const subtitulo = 'Interfaz de Consulta';
  const objetos_busqueda = {1:'Autor',2:'Institución',3:'Grupo',4:'Título',5:'Materias',6:'P. claves',7:'Colección',8:'Subcomunidad'};

  const [header, setHeader] = useState(temp_json['head']['vars']);

  const [resultado, setResultado] = useState(temp_json['results']['bindings']);

  const [resultado_filtrado, setResultadoFitrado] = useState(resultado);

  console.log(resultado_filtrado)


  return (
    <div>


      <div className="flex flex-wrap mt-8 mb-4">
        <div className="w-3/4 mx-auto my-auto text-center text-xl shadow-2xl bg-white shadow-md rounded px-8 pt-12 pb-12">
            <p>{titulo}</p>
            <p>{subtitulo}</p>
        </div>
      </div>




      <form>
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
                <button className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                  Consultar Recursos
                </button>
              </div>
            </div>
        </div>
      </form>


      
      <div className="flex flex-wrap py-4">
        <div className="w-3/4 mx-auto text-center text-xl py-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

        <div className="flex flex-row-reverse mb-16">
          <div className="lg:w-3/4">
            <label className="mb-1 md:mb-0 pr-4">
              Escriba una palabra para filtrar :
            </label>
              <input className="text-center bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"/>
          </div>
        </div>
        
        <div className="flex overflow-auto">
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
            <tbody>
              {
                resultado_filtrado.map(
                  (elemento) =>
                  <tr> 
                      {Object.entries(elemento).map(
                        ([key, value]) => <td className="border px-4 py-2">{value['value']}</td>
                      )}
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>


        </div>
      </div>



    </div>
  );
}

export default App;
