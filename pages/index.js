import React from 'react';
import MainGrid from '../scr/componentes/MainGrid';
import Box from '../scr/componentes/Box';
import {AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet} from '../scr/componentes/lib/AlurakutCommuns';
import {ProfileRelationsBoxWrapper} from '../scr/componentes/ProfileRelations';

function ProfileSidebar(propriedades){
  return(
    <Box as='aside'>
      <img src = {`https://github.com/${propriedades.githubUser}.png`} style={{borderRadius: "8px"}}/>
      <hr />
      <p>
      <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
        @{propriedades.githubUser}
      </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault/>
    </Box>
  )
}


export default function Home() {
  const githubUser = "PGurgel"; //pode mudar a foto de perfil alterando no nome do github

  const [comunidades, setComunidades] = React.useState([]);

  const pessoasFavoritas = [
    'mulucas',   
    'juunegreiros',
    'peas',
    'omariosouto',
    'rafaballerini',
    'marcobrunodev',
  ];
  return (
    <>
      <AlurakutMenu/>
      <MainGrid>
        <div className='profileArea' style={{gridArea: 'profileArea'}}>
          <ProfileSidebar githubUser={githubUser}/>
        </div>

        <div className='welcomeArea' style={{gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className='title'>
              Bem vindo(a)
            </h1>
            <OrkutNostalgicIconSet/>
          </Box>

          <Box>
            <h2 className='subTitle'>O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e) {
                e.preventDefault();
                const dadosDoForm = new FormData(e.target);

                console.log('Campo: ', dadosDoForm.get('title'));
                console.log('Campo: ', dadosDoForm.get('image'));

                const comunidade = {
                  title: dadosDoForm.get('title'),
                  imageUrl: dadosDoForm.get('image'),
                  creatorSlug: githubUser,
                }

                fetch('/api/comunidades', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(comunidade)
                })
                .then(async (response) => {
                  const dados = await response.json();
                  console.log(dados.registroCriado);
                  const comunidade = dados.registroCriado;
                  const comunidadesAtualizadas = [...comunidades, comunidade];
                  setComunidades(comunidadesAtualizadas)
                })
            }}>
              <div>
                <input 
                  placeholder ='Digite o nome da sua comunidade?'
                  name="title" 
                  arial-label="Digite o nome da sua comunidade?"
                  type="text"/>
              </div>

              <div>
                <input 
                  placeholder ='Coloque uma URL para usarmos de capa'
                  name="image" 
                  arial-label="Coloque uma URL para usarmos de capa"/>
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>

        <div className='profileRelationsArea' style={{gridArea: 'profileRelationsArea'}}>
        <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/communities/${itemAtual.id}`}>
                      <img src={itemAtual.imageUrl} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
