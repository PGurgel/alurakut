import MainGrid from '../scr/componentes/MainGrid'
import Box from '../scr/componentes/Box'
import {AlurakutMenu, OrkutNostalgicIconSet} from '../scr/componentes/lib/AlurakutCommuns';
import {ProfileRelationsBoxWrapper} from '../scr/componentes/ProfileRelations';

function ProfileSidebar(propriedades){
  console.log(propriedades);
  return(
    <Box>
      <img src = {`https://github.com/${propriedades.githubUser}.png`} style={{borderRadius: "8px"}}/>
    </Box>
  )
}


export default function Home() {
  const githubUser = "PGurgel"; //pode mudar a foto de perfil alterando no nome do github
  const pessoasFavoritas = [   
    'juunegreiros',
    'peas',
    'omariosouto',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]
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
        </div>

        <div className='profileRelationsArea' style={{gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>
               Pessoa da comunidade({pessoasFavoritas.length})
            </h2>
           
          <ul>
            {pessoasFavoritas.map((itemAtual)=> {
                return(
              <li>
                <a href={`/users/${itemAtual}`} key={itemAtual}>
                  <img src={`https://github.com/${itemAtual}.png`}/>
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
