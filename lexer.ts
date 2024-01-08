export enum TokenType {
  Number,
  Identifier,
  Equals,
  OpenParenthesis,
  CloseParenthesis,
  BinaryOperator,
  Let,
}

const KEYWORDS: Record<string, TokenType> = {
  'let': TokenType.Let,
};

export interface Token {
  value: string;
  type: TokenType;
}

function token(value = '', type: TokenType): Token {
  return { value, type };
}

function isAlphabetic(source: string): boolean {
  return source.toUpperCase() != source.toLowerCase();
}

function isInteger(source: string): boolean {
  const sourceUnicode = source.charCodeAt(0);
  const bounds = ['0'.charCodeAt(0), '9'.charCodeAt(0)];
  return sourceUnicode >= bounds[0] && sourceUnicode <= bounds[1];
}

function isSkippable(source: string): boolean {
  return source == ' ' || source == '\n' || source == '\t';
}

export function tokenize(sourceCode: string): Token[] {
  const tokens = new Array<Token>();
  const source = sourceCode.split('');
  while (source.length > 0) {
    if (source[0] == '(') {
      tokens.push(token(source.shift(), TokenType.OpenParenthesis));
    } else if (source[0] == ')') {
      tokens.push(token(source.shift(), TokenType.CloseParenthesis));
    } else if (
      source[0] == '+' ||
      source[0] == '-' ||
      source[0] == '*' ||
      source[0] == '/'
    ) {
      tokens.push(token(source.shift(), TokenType.BinaryOperator));
    } else if (source[0] == '=') {
      tokens.push(token(source.shift(), TokenType.Equals));
    } else {
      if (isInteger(source[0])) {
        let number = '';
        while (source.length > 0 && isInteger(source[0])) {
          number += source.shift();
        }
        tokens.push(token(number, TokenType.Number));
      } else if (isAlphabetic(source[0])) {
        let identifier = '';
        while (source.length > 0 && isAlphabetic(source[0])) {
          identifier += source.shift();
        }

        const reserved = KEYWORDS[identifier];
        if (reserved == undefined) {
          tokens.push(token(identifier, TokenType.Identifier));
        } else {
          tokens.push(token(identifier, reserved));
        }
      } else if (isSkippable(source[0])) {
        source.shift();
      } else {
        console.log('Unrecognized character found in source: ', source[0]);
        Deno.exit(1);
      }
    }
  }

  return tokens;
}
