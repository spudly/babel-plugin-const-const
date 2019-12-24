import {transform} from '@babel/core';
import plugin from '.';

it('imports deepfreeze & deepfreezes all const declarations', () => {
  const input = `const a = {x: {y: {z: 1}}};`;
  const output = transform(input, {plugins: [plugin]}).code;
  expect(output).toMatchInlineSnapshot(`
    "import deepfreeze from \\"deepfreeze\\";
    const a = deepfreeze({
      x: {
        y: {
          z: 1
        }
      }
    });"
  `);
});

it('only adds import one time', () => {
  const input = `
    const a = {x: {y: {z: 1}}};
    const b = {x: {y: {z: 1}}};
  `;
  const output = transform(input, {plugins: [plugin]}).code;
  expect(output).toMatchInlineSnapshot(`
    "import deepfreeze from \\"deepfreeze\\";
    const a = deepfreeze({
      x: {
        y: {
          z: 1
        }
      }
    });
    const b = deepfreeze({
      x: {
        y: {
          z: 1
        }
      }
    });"
  `);
});

it("doesn't change let declarations", () => {
  const input = `let a = {x: {y: {z: 1}}};`;
  const output = transform(input, {plugins: [plugin]}).code;
  expect(output).toMatchInlineSnapshot(`
    "let a = {
      x: {
        y: {
          z: 1
        }
      }
    };"
  `);
});
