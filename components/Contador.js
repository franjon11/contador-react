const Contador = () => {
    const [contador, setContador] = React.useState(0);

    const aumentar = () => setContador(contador + 1);
    const disminuir = () => setContador(contador - 1);

    
    
    return (
        <div>
            {/* le damos la clase al texto con operador ternario */}
            <h1 className={contador < 0 ? "menor" : "mayor"}>Contador: {contador}</h1>
            <hr />

            {/* el evento se pasa en mayusculas la 1er letra */}
            {/* Se pone una arrow function (podria estar ahi dentro) */}

            <button onClick={aumentar}>
                Aumentar
            </button>
            <button onClick={disminuir}>
                Disminuir
            </button>
        </div>
    );
}