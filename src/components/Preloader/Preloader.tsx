import loader from "../../svg/Eclipse-1s-200px.svg"

let Preloader = (): JSX.Element => {
    return <div>
        <img src={loader} alt="" />
    </div>
}

export default Preloader;