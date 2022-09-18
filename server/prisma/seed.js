import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  await prisma.cards.deleteMany();
  await prisma.subjects.deleteMany();
  await prisma.flashCards.deleteMany();

  const card = await prisma.cards.create({
    data: {
      title: "React",
    },
  });

  const subject = await prisma.subjects.create({
    data: {
      title: "Hooks",
      cardId: card.id,
    },
  });
  const subject2 = await prisma.subjects.create({
    data: {
      title: "Redux",
      cardId: card.id,
    },
  });
  const subject3 = await prisma.subjects.create({
    data: {
      title: "Class Components",
      cardId: card.id,
    },
  });

  await prisma.flashCards.create({
    data: {
      question: "What is useState",
      solution:
        'Syntax\nconst [data, setData] = useState("");\n\nuseState is a Hook (function) that allows you to have state variables in functional components. You pass the initial state to this function and it returns a variable with the current state value (not necessarily the initial state) and another function to update this value\n\n',
      subjectId: subject.id,
    },
  });

  await prisma.flashCards.create({
    data: {
      question: "What is useEffect",
      solution:
        "The useEffect Hook allows you to perform side effects in your components. Some examples of side effects are: fetching data, directly updating the DOM, and timers. useEffect accepts two arguments. The second argument is optional. useEffect(<function>, <dependency>)",
      subjectId: subject.id,
    },
  });
  await prisma.flashCards.create({
    data: {
      question: "What is useCallback",
      solution:
        "useCallback will return a memoized version of the callback that only changes if one of the dependencies has changed. This is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders (e.g. shouldComponentUpdate ).",
      subjectId: subject.id,
    },
  });

  await prisma.flashCards.create({
    data: {
      question: "What is useSelector",
      solution:
        "useSelector is a function that takes the current state as an argument and returns whatever data you want from it and it allows you to store the return values inside a variable within the scope of you functional components instead of passing down as props.",
      subjectId: subject2.id,
    },
  });
  await prisma.flashCards.create({
    data: {
      question: "What is useDispatch",
      solution:
        "The useDispatch hook lets us efficiently dispatch actions while the useSelector hook gives us access to the global state anywhere in the application. These hooks are easy to understand and even easier to use.",
      subjectId: subject2.id,
    },
  });
}

seed();
