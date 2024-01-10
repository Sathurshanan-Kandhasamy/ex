// deno-lint-ignore-file no-empty-interface
export type NodeType =
  | 'Program'
  | 'NumericLiteral'
  | 'Indentifier'
  | 'BinaryExpression';

export interface Statement {
  kind: NodeType;
}

export interface Program extends Statement {
  kind: 'Program';
  body: Statement[];
}

export interface Expression extends Statement {}

export interface BinaryExpression extends Expression {
  kind: 'BinaryExpression';
  left: Expression;
  right: Expression;
  operator: string;
}

export interface Indentifier extends Expression {
  kind: 'Indentifier';
  symbol: string;
}

export interface NumericLiteral extends Expression {
  kind: 'NumericLiteral';
  value: number;
}
