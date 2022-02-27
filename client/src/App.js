import Container from 'react-bootstrap/Container'
import Content from './components/Content'
import Forms from './components/Forms'


function App() {
	return (
			<Container className='py-3 mt-3'>
				<h1 className='text-center text-dark mb-3'>My Books</h1>
				<hr />
				<Forms />
				<hr />
				<Content />			
			</Container>
	)
}

export default App
