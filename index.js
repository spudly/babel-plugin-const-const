export default function(babel) {
  const {types: t} = babel;
  let injectedImport;

  return {
    pre() {
      injectedImport = false;
    },
    visitor: {
      VariableDeclaration(path) {
        if (path.node.kind === 'const') {
          const initializer = path.node.declarations[0].init;
          path.node.declarations[0].init = t.CallExpression(
            t.Identifier('deepfreeze'),
            [initializer],
          );

          if (!injectedImport) {
            path
              .findParent(path => path.isProgram())
              .unshiftContainer(
                'body',
                t.ImportDeclaration(
                  [t.ImportDefaultSpecifier(t.Identifier('deepfreeze'))],
                  t.StringLiteral('deepfreeze'),
                ),
              );
            injectedImport = true;
          }
        }
      },
    },
  };
}
