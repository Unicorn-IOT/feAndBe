import React from 'react';
import { useRouter } from 'next/router';

import { Box, Button, Grid, Typography } from '@mui/material';
import { wrapper } from '../store';
import { prepopulateUserInfo } from '../store/server/prepopulateUserInfo';
import { useServerLoggedOutRedirect } from '../store/server/useServerLoggedOutRedirect';

export default function Terms() {
	const router = useRouter();
	return (
		<Box
			sx={{
				backgroundColor: (theme) => (theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900]),
				flexGrow: 1,
				height: '100vh',
				overflow: 'auto',
			}}
		>
			<Grid container display="flex" justifyContent="center">
				<Grid item>
					<Typography variant="h1">Terms</Typography>
				</Grid>
				<Grid item>
					1. Úvodní ustanovení 1.1. Tyto obchodní podmínky (dále jen „obchodní podmínky“) obchodní společnosti Moje firma, s.r.o.
					, se sídlem Moje adresa , identifikační číslo: XXX XXX XXX, zapsané v obchodním rejstříku vedeném XXX , oddíl X, vložka
					XXXX dále jen „prodávající“) upravují v souladu s ustanovením § 1751 odst. 1 zákona č. 89/2012 Sb., občanský zákoník, ve
					znění pozdějších předpisů (dále jen „občanský zákoník“) vzájemná práva a povinnosti smluvních stran vzniklé v
					souvislosti nebo na základě kupní smlouvy dále jen „kupní smlouva“) uzavírané mezi prodávajícím a jinou fyzickou osobou
					(dále jen „kupující“) prostřednictvím internetového obchodu prodávajícího. Internetový obchod je prodávajícím provozován
					na webové stránce umístěné na internetové adrese (dále jen „webová stránka“), a to prostřednictvím rozhraní webové
					stránky (dále jen „webové rozhraní obchodu“). Ustanovení § 435 odst. 1 občanského zákoníku: „Každý podnikatel musí
					uvádět na obchodních listinách a v rámci informací zpřístupňovaných veřejnosti prostřednictvím dálkového přístupu své
					jméno a sídlo. Podnikatel zapsaný v obchodním rejstříku uvede na obchodní listině též údaj o tomto zápisu včetně oddílu
					a vložky; podnikatel zapsaný v jiném veřejném rejstříku uvede údaj o svém zápisu do tohoto rejstříku; podnikatel
					nezapsaný ve veřejném rejstříku uvede údaj o svém zápisu do jiné evidence. Byl-li podnikateli přidělen identifikující
					údaj, uvede i ten.“ 1.2. Obchodní podmínky se nevztahují na případy, kdy osoba, která má v úmyslu nakoupit zboží od
					prodávajícího, je právnickou osobou či osobou, jež jedná při objednávání zboží v rámci své podnikatelské činnosti nebo v
					rámci svého samostatného výkonu povolání. Vzor obchodních podmínek je určen pro právní vztahy mezi podnikatelem
					(dodavatelem) a spotřebitelem a vzor tak není vhodný mimo jiné pro použití v tzv. obchodně-závazkových vztazích. Vzor
					obchodních podmínek neupravuje situace, kdy je dodáván digitální obsah. Vzor obchodnich podmínek není vhodný pro
					situace, kdy je kupní smlouva uzavírána telefonicky. 1.3. Ustanovení odchylná od obchodních podmínek je možné sjednat v
					kupní smlouvě. Odchylná ujednání v kupní smlouvě mají přednost před ustanoveními obchodních podmínek. 1.4. Ustanovení
					obchodních podmínek jsou nedílnou součástí kupní smlouvy. Kupní smlouva a obchodní podmínky jsou vyhotoveny v českém
					jazyce. Kupní smlouvu lze uzavřít v českém jazyce. Ustanovení § 1826 odst. 1 písm. b) občanského zákoníku: „Při použití
					elektronických prostředků uvede podnikatel i údaje o jazycích, ve kterých lze smlouvu uzavřít…“ 1.5. Znění obchodních
					podmínek může prodávající měnit či doplňovat. Tímto ustanovením nejsou dotčena práva a povinnosti vzniklá po dobu
					účinnosti předchozího znění obchodních podmínek.
				</Grid>

				<Grid item>
					<Button onClick={() => router.push('/registration')} sx={{ border: 'thick double #32a1ce', margin: 5 }}>
						Get back on Registration page
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
	prepopulateUserInfo(store, context);
	return {
		props: {},
		redirect: useServerLoggedOutRedirect(context),
	};
});
