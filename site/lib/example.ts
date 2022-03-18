/* eslint-disable camelcase */
const time = `G'DAY MATE!

IMPOHT ME FUNC GimmeTime;

THE HARD YAKKA FOR gimmeTimeMate IS () <
    GIMME "Oi mate, the time in Melbourne is: " + GimmeTime();
>

gimmeTimeMate();

CHEERS C***!
`

const fibonacci = `G'DAY MATE!

THE HARD YAKKA FOR fibonacci IS ( x ) <
	YA RECKON x <= 1 ? BAIL x;

	BAIL fibonacci(x - 1) + fibonacci(x - 2);
>

GIMME fibonacci(5);

CHEERS C***!
`

const dreamtime = `G'DAY MATE!

IMPOHT ME FUNC HitTheSack;
IMPOHT ME FUNC ChuckSomeDice;

THE HARD YAKKA FOR dreamtime IS () <
	GIMME "'boutta get some winks mate";

	I RECKON I'LL HAVE A WALKABOUT UNTIL (Yeah, nah!) <
	    GIMME "zZz...";

		HitTheSack(1000);

		YA RECKON ChuckSomeDice(0, 6) == 0 ? MATE FUCK THIS;
	>

	GIMME "that nap was bonza mate!";
>

dreamtime();

CHEERS C***!
`

const come_in_spinner = `G'DAY MATE!

IMPOHT ME FUNC ChuckSomeDice;

// Tails are odd numbers & true values; heads are even numbers & false values. Unexpected values resolve to Heads.
// Returns values according to this table, where T == tails/true, H == heads/false
//
//     coin1  T     H
//         +-----+-----+
//       T |Tails|Odds |
// coin2   +-----+-----+
//       H |Odds |Heads|
//         +-----+-----+
THE HARD YAKKA FOR comeInSpinner IS (coin1, coin2) <
    I RECKON coin1isTails = YEAH, NAH!;
    I RECKON coin2isTails = YEAH, NAH!;
    
    YA RECKON coin1 IS A <
        YEAH, NAH!       ~ coin1isTails = YEAH, NAH!;
        NAH, YEAH!       ~ coin1isTails = NAH, YEAH!;
        buggeredIfIKnow ~ coin1isTails = (buggeredIfIKnow % 2) == 1;
    >
    
    YA RECKON coin2 IS A <
        YEAH, NAH!       ~ coin2isTails = YEAH, NAH!;
        NAH, YEAH!       ~ coin2isTails = NAH, YEAH!;
        buggeredIfIKnow ~ coin2isTails = (buggeredIfIKnow % 2) == 1;
    >
    
    YA RECKON coin1isTails ? <
        YA RECKON coin2isTails ? < BAIL "Tails"; >
        WHATABOUT ? < BAIL "Odds"; >
    > WHATABOUT ? <
        YA RECKON coin2isTails ? < BAIL "Odds"; >
        WHATABOUT ? < BAIL "Heads"; >
    >
>

THE HARD YAKKA FOR tossACoin IS () <
    BAIL ChuckSomeDice(0, 2) == 1;
>

GIMME comeInSpinner(tossACoin(), tossACoin());

CHEERS C***!
`

const fizzbuzz = `G'DAY MATE!

THE HARD YAKKA FOR FuckWit IS (n) <
    I RECKON x IS A WALKABOUT FROM [0 TO n) <
        YA RECKON x % 15 == 0 ? GIMME "FuckWit";
        WHATABOUT x % 3  == 0 ? GIMME "Fuck";
        WHATABOUT x % 5  == 0 ? GIMME "Wit";
	>
>

FuckWit(100);

CHEERS C***!
`

export const examples: Record<string, string> = {
  fibonacci,
  dreamtime,
  time,
  come_in_spinner,
  fizzbuzz
}
