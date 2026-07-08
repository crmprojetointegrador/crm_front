import AboutCard from '../components/AboutCard';

// Dados das integrantes
const integrantes = [
    {
        id: 1,
        nome: 'Alanis Santos',
        cargo: 'Desenvolvedora Full Stack',
        github: 'https://github.com/alanis-santos',
        linkedin: 'https://linkedin.com/in/devalanissantos/',
        foto: '/src/assets/PerfilAlanis.jpg',
    },
    {
        id: 2,
        nome: 'Bruna Mendes',
        cargo: 'Desenvolvedora Full Stack',
        github: 'https://github.com/bruna-dsmendes',
        linkedin: 'https://linkedin.com/in/devbrunamendes/',
        foto: '/src/assets/PerfilBruna.jpg',
    },
    {
        id: 3,
        nome: 'Eliane Orlandin',
        cargo: 'Desenvolvedora Full Stack',
        github: 'https://github.com/Eliane-orlandin',
        linkedin: 'https://linkedin.com/in/elianeorlandindocarmo/',
        foto: '/src/assets/PerfilEliane.jpg',
    },
    {
        id: 4,
        nome: 'Flame Souza',
        cargo: 'Desenvolvedora Full Stack',
        github: 'https://github.com/PraFlame',
        linkedin: 'https://linkedin.com/in/souflame/',
        foto: '/src/assets/PerfilFlame.jpg',
    },
    {
        id: 5,
        nome: 'Milena Fernandes',
        cargo: 'Desenvolvedora Full Stack',
        github: 'https://github.com/MiFlow8',
        linkedin: 'https://linkedin.com/in/milenafernandessilva/',
        foto: '/src/assets/PerfilMilena.jpg',
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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
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