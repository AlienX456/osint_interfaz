/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React, { useState } from 'react';
import './App.css';


function App() {
  const titulo = 'Metamodelo para vinculación de recursos educativos abiertos mediante especificaciones LOD y basado en principios de confianza';
  const subtitulo = 'Interfaz de Consulta';
  const objetos_busqueda = {1:'Autor',2:'Institución',3:'Grupo',4:'Título',5:'Materias',6:'P. claves',7:'Colección',8:'Subcomunidad'};
  return (
    <div>
      <div className="flex flex-wrap my-8">
        <div className="w-3/4 mx-auto my-auto text-center text-xl shadow-2xl bg-white shadow-md rounded px-8 pt-12 pb-12 mb-4">
            <p>{titulo}</p>
            <p>{subtitulo}</p>
        </div>
      </div>
      <div className="flex flex-wrap py-8">

        <div className="w-3/8 mx-auto px-4 text-center text-xl py-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <form>
            <label class="md:w-2/3 mx-auto block mb-4">
              <input class="mr-2 leading-tight" type="checkbox"/>
              <span class="text-sm">
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
              <div className="md:w-2/3 my-8 mx-auto">
                <button className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                  Consultar
                </button>
              </div>
          </form>
        </div>

        <div className="w-3/8 mx-auto text-center text-xl py-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          sdsfsdfsdf
        </div>

      </div>
    </div>
  );
}

export default App;
