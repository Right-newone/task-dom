/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега
   и count - количество вставок.
  Необходимо, чтобы функция осуществила 
  вставку на страницу указанный тег с 
  указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, 
  допускающий вставку текста в качестве своего 
  содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    for (let i = 0; i < count; ++i) {
        const new_element = document.createElement(tag);
        new_element.textContent = content;
        document.body.append(new_element);
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида 
  item_n, где n - глубина вложенности элемента. 
  Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве 
  результата работы функции.
*/
export function generateTree(childrenCount, level) {
    const root = document.createElement('div');
    root.classList.add('item_1');

    if (level === 1) return root;
    let currentLevelElements = [root];
    for (let currentLevel = 2; currentLevel <= level; currentLevel++) {
        let nextLevelElements = [];
        for (let parentElement of currentLevelElements) {
            for (let i = 0; i < childrenCount; i++) {
                const child = document.createElement('div');
                child.classList.add(`item_${currentLevel}`);
                parentElement.append(child);
                nextLevelElements.push(child);
            }
        }
        currentLevelElements = nextLevelElements;
    }

    return root;
}

/*
  Используйте функцию для создания дерева тегов DIV 
  из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом 
  элементов в каждом узле 2.
  Далее замените все узлы второго уровня 
  (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните 
  неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве 
  результата работы функции.
*/
export function replaceNodes() {
    const root = generateTree(2, 3);

    const nodesToReplace = root.querySelectorAll('.item_2');

    nodesToReplace.forEach((divNode) => {
        const sectionNode = document.createElement('section');
        sectionNode.className = divNode.className;
        sectionNode.append(...divNode.childNodes);
        divNode.replaceWith(sectionNode);
    });
    return root;
}
