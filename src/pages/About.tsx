import AboutCard from '../components/AboutCard';
import fotoAlanis from '../assets/PerfilAlanis.jpg';
import fotoBruna from '../assets/PerfilBruna.jpg';
import fotoEliane from '../assets/PerfilEliane.jpg';
import fotoFlame from '../assets/PerfilFlame.jpg';

// Dados das integrantes
const integrantes = [
    {
        id: 1,
        nome: 'Alanis Santos',
        cargo: 'Desenvolvedora Full Stack',
        github: 'https://github.com/alanis-santos',
        linkedin: 'https://linkedin.com/in/devalanissantos/',
        foto: fotoAlanis,
    },
    {
        id: 2,
        nome: 'Bruna Mendes',
        cargo: 'Desenvolvedora Full Stack',
        github: 'https://github.com/bruna-dsmendes',
        linkedin: 'https://linkedin.com/in/devbrunamendes/',
        foto: fotoBruna,
    },
    {
        id: 3,
        nome: 'Eliane Orlandin',
        cargo: 'Desenvolvedora Full Stack',
        github: 'https://github.com/Eliane-orlandin',
        linkedin: 'https://linkedin.com/in/elianeorlandindocarmo/',
        foto: fotoEliane,
    },
    {
        id: 4,
        nome: 'Flame Souza',
        cargo: 'Desenvolvedora Full Stack',
        github: 'https://github.com/PraFlame',
        linkedin: 'https://linkedin.com/in/souflame/',
        foto: fotoFlame,
    },
];

function About() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center text-purple-700 mb-8">
                Sobre Nós
            </h1>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                Conheça a equipe por trás deste projeto. Somos um grupo de desenvolvedoras apaixonadas por resolver problemas.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {integrantes.map((integrante) => (
                    <AboutCard
                        key={integrante.id}
                        nome={integrante.nome}
                        cargo={integrante.cargo}
                        github={integrante.github}
                        linkedin={integrante.linkedin}
                        foto={integrante.foto}
                    />
                ))}
            </div>
        </div>
    );
}

export default About;