import Animes from "../../models/animes";


const testeFunction = async () => {
    const teste = await Animes.create({
        name: "Chuunibyou",
        description: 'Yūta Togashi é um menino que, durante o ensino fundamental, tinha "delírios adolescentes" (中二病 chūnibyō?, "doença da oitava série"), acreditando ser o "Mestre das Chamas Negras" e se afastando de seus colegas. Achando seu passado embaraçoso, Yūta tenta recomeçar no ensino médio em uma escola nova, livre de seus antigos delírios. Só que isso se mostra difícil, no entanto, pois outra adolescente com delírios adolescentes, uma garota chamada Rikka Takanashi, descobre sobre a outra identidade de Yūta e começa a se interessar por ele.',
        category: 'shoujo',
        numberOfEpisodes: 13
    });
    console.log(teste);
    return teste;
}

export default testeFunction;