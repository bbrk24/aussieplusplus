use std::io::Stdout;

use aussie_plus_plus::{
    lexer::{source, Lexer},
    parser::parser::Parser,
    runtime::Interpreter,
};

fn test_code(src: &str, expected: &str) {
    let expected = expected.to_owned() + "\n";
    let mut s = "print ".to_string();
    s.push_str(src);
    let mut lex = Lexer::new(source::Regular::new(src.chars()));
    let (tokens, _) = lex.lex();
    let mut parser = Parser::new(tokens);
    let stmts = parser.parse();

    let mut buf: Vec<u8> = Vec::with_capacity(128);
    let mut iptr = Interpreter::new_with_writer(&mut buf);

    if let Err(e) = iptr.interpret(stmts) {
        panic!("Failed to interpret: {}", e);
    }

    println!("Testing expression: {}", s);
    match std::str::from_utf8(&buf) {
        Err(e) => panic!("Failed to read buffer: {}", e),
        Ok(s) => {
            assert_eq!(s, expected);
        }
    }
}

#[test]
fn test_vars() {
    test_code(
        "
    I RECKON x = 10;
    gimme x;
    x = 5;
    gimme x;
    ",
        "10\n5",
    );

    test_code(
        "I RECKON x = 10;
    <
        I RECKON x = 5;
        gimme x;
    >
    gimme x;
    ",
        "5\n10",
    );

    test_code(
        "I RECKON x = 10;
    <
        x = 5;
        gimme x;
    >
    gimme x;
    ",
        "5\n5",
    );
}

#[test]
fn test_match() {
    // Works with bools
    test_code(
        "i reckon x = 2;
        ya reckon x == 2 is a <
                    Nah, yeah ~ gimme \"FARK\";
                    Yeah, nah ~ gimme f;
                >",
        "FARK",
    );

    // Works with numbers
    test_code(
        "i reckon x = 420;
        ya reckon x is a <
                    1 ~ gimme \"FARK\";
                    2 ~ gimme \"CARN\";
                    420 ~ gimme \"FAIR DINKUM\";
                >
                gimme x;",
        "FAIR DINKUM\n420",
    );

    // Works with strings
    test_code(
        "i reckon x = \"G'day mate\";
        ya reckon x is a <
            \"Strewth!\" ~ gimme \"Strewth!\";
            \"G'day mate\" ~ gimme \"G'day mate\";
        >
        ",
        "G'day mate",
    );

    // Works with nil
    test_code(
        "i reckon x = BUGGER ALL;
        ya reckon x is a <
            BuGGEr ALL ~ gimme bugger all;
            somethinElse ~ gimme somethinElse;
        >
        ",
        "bugger all",
    );

    // Default case
    test_code(
        "i reckon x = 42069;
        ya reckon x is a <
            1 ~ gimme \"fark!\";
            1 ~ gimme \"carn!\";
            somethinElse ~ gimme somethinElse;
        >
        ",
        "42069",
    );
}

#[test]
fn test_ops() {
    test_code("gimme 5 + 2;", "7");
    test_code("gimme 5 - 2;", "3");
    test_code("gimme 5 * 2;", "10");
    test_code("gimme 5 / 2;", "2.5");
    test_code("gimme 5 > 2;", "Nah, yeah");
    test_code("gimme 5 >= 2;", "Nah, yeah");
    test_code("gimme 5 < 2;", "Yeah, nah");
    test_code("gimme 5 <= 2;", "Yeah, nah");
    test_code("gimme 5 == 2;", "Yeah, nah");
    test_code("gimme 5 != 2;", "Nah, yeah");

    test_code("gimme ((5 + 5) / 2) * 2;", "10");

    test_code("gimme 5 + 5 * 2 / 2;", "10");
}