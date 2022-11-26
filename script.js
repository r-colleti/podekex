const input = document.querySelector('.inputSearchPokemon');
const form = document.querySelector('.formInputSearch');

function changePoke() {

	const poke = document.querySelector('.pokeElement');
	const assideHide = document.querySelector('.copySec');
	const body = document.querySelector('body');
	const openedInputs = document.querySelector('.openedInputs');

	if (poke.src == 'http://localhost/pokedex/images/pkclose.png') {

		poke.src = './images/pkopen.png';
		assideHide.style.display = 'none';
		body.style.gridTemplateColumns = '1fr 0px';
		openedInputs.style.display = 'flex';

	} else {

		assideHide.style.display = 'flex';
		body.style.gridTemplateColumns = '1fr 400px';
		openedInputs.style.display = 'none';
		poke.src = './images/pkclose.png';

	}
}

const fetchPokemon = async (pokemon) => {
	const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

	if (apiResponse.status == 200) {
		const data = await apiResponse.json();
		return data;
	}
}

const renderData = async (pokemon) => {

	const nameArea = document.querySelector('.nomePokemon');
	const imgArea = document.querySelector('.pokemonPreview');

	nameArea.innerHTML = 'Carregando...';

	const data = await fetchPokemon(pokemon)

	if (data) {
		nameArea.innerHTML = `${data.id} - ${data.name}`;
		imgArea.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];;
	} else {
		nameArea.innerHTML = 'Não encontrado';
		imgArea.src = './images/errorSearch.png';
	}
}

form.addEventListener('submit', (event) => {
	event.preventDefault();
	renderData(input.value)
})

async function prevPokemon() {

	const atualPoke = await fetchPokemon(input.value);

	if (atualPoke.id > 1) {
		const prevPokeId = await atualPoke.id - 1;
		renderData(prevPokeId);
		input.value = prevPokeId;
	}
}

async function nextPokemon() {

	const atualPoke = await fetchPokemon(input.value);

	if (atualPoke.id < 649) {
		const prevPokeId = await atualPoke.id + 1;
		renderData(prevPokeId);
		input.value = prevPokeId;
	}
}