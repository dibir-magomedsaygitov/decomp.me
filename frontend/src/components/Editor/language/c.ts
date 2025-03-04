import type { languages } from "monaco-editor"

export const conf: languages.LanguageConfiguration = {
    comments: {
        lineComment: "//",
        blockComment: ["/*", "*/"],
    },
    brackets: [
        ["{", "}"],
        ["[", "]"],
        ["(", ")"],
    ],
    autoClosingPairs: [
        { open: "[", close: "]" },
        { open: "{", close: "}" },
        { open: "(", close: ")" },
        { open: "'", close: "'", notIn: ["string", "comment"] },
        { open: "\"", close: "\"", notIn: ["string"] },
    ],
    surroundingPairs: [
        { open: "{", close: "}" },
        { open: "[", close: "]" },
        { open: "(", close: ")" },
        { open: "\"", close: "\"" },
        { open: "'", close: "'" },
    ],
    folding: {
        markers: {
            start: new RegExp("^\\s*#pragma\\s+region\\b"),
            end: new RegExp("^\\s*#pragma\\s+endregion\\b"),
        },
    },
}

export const language: languages.IMonarchLanguage = {
    defaultToken: "",
    tokenPostfix: ".c",

    brackets: [
        { token: "delimiter.curly", open: "{", close: "}" },
        { token: "delimiter.parenthesis", open: "(", close: ")" },
        { token: "delimiter.square", open: "[", close: "]" },
        { token: "delimiter.angle", open: "<", close: ">" },
    ],

    keywords: [
        "abstract",
        "amp",
        "array",
        "auto",
        "break",
        "case",
        "catch",
        "class",
        "const",
        "constexpr",
        "const_cast",
        "continue",
        "cpu",
        "decltype",
        "default",
        "delegate",
        "delete",
        "do",
        "double",
        "dynamic_cast",
        "each",
        "else",
        "enum",
        "event",
        "explicit",
        "export",
        "extern",
        "false",
        "final",
        "finally",
        "for",
        "friend",
        "gcnew",
        "generic",
        "goto",
        "if",
        "in",
        "initonly",
        "inline",
        "interface",
        "interior_ptr",
        "internal",
        "literal",
        "long",
        "mutable",
        "namespace",
        "new",
        "noexcept",
        "nullptr",
        "__nullptr",
        "operator",
        "override",
        "partial",
        "pascal",
        "pin_ptr",
        "private",
        "property",
        "protected",
        "public",
        "ref",
        "register",
        "reinterpret_cast",
        "restrict",
        "return",
        "safe_cast",
        "sealed",
        "short",
        "signed",
        "sizeof",
        "static",
        "static_assert",
        "static_cast",
        "struct",
        "switch",
        "template",
        "this",
        "thread_local",
        "throw",
        "tile_static",
        "true",
        "try",
        "typedef",
        "typeid",
        "typename",
        "union",
        "using",
        "virtual",
        "volatile",
        "wchar_t",
        "where",
        "while",

        "_asm", // reserved word with one underscores
        "_based",
        "_cdecl",
        "_declspec",
        "_fastcall",
        "_if_exists",
        "_if_not_exists",
        "_inline",
        "_multiple_inheritance",
        "_pascal",
        "_single_inheritance",
        "_stdcall",
        "_virtual_inheritance",
        "_w64",

        "__abstract", // reserved word with two underscores
        "__alignof",
        "__asm",
        "__assume",
        "__based",
        "__box",
        "__builtin_alignof",
        "__cdecl",
        "__clrcall",
        "__declspec",
        "__delegate",
        "__event",
        "__except",
        "__fastcall",
        "__finally",
        "__forceinline",
        "__gc",
        "__hook",
        "__identifier",
        "__if_exists",
        "__if_not_exists",
        "__inline",
        "__int128",
        "__int16",
        "__int32",
        "__int64",
        "__int8",
        "__interface",
        "__leave",
        "__m128",
        "__m128d",
        "__m128i",
        "__m256",
        "__m256d",
        "__m256i",
        "__m64",
        "__multiple_inheritance",
        "__newslot",
        "__nogc",
        "__noop",
        "__nounwind",
        "__novtordisp",
        "__pascal",
        "__pin",
        "__pragma",
        "__property",
        "__ptr32",
        "__ptr64",
        "__raise",
        "__restrict",
        "__resume",
        "__sealed",
        "__single_inheritance",
        "__stdcall",
        "__super",
        "__thiscall",
        "__try",
        "__try_cast",
        "__typeof",
        "__unaligned",
        "__unhook",
        "__uuidof",
        "__value",
        "__virtual_inheritance",
        "__w64",
        "__wchar_t",
    ],

    types: [
        "void",
        "s64",
        "s32",
        "s16",
        "s8",
        "u64",
        "u32",
        "u16",
        "u8",
        "f64",
        "f32",
        "bool",
        "char",
        "int",
        "float",
        "long",
        "unsigned",
    ],

    operators: [
        "=",
        "!",
        "~",
        "?",
        ":",
        "&&",
        "||",
        "++",
        "--",
        "+",
        "-",
        "*",
        "/",
        "&",
        "|",
        "^",
        "%",
        "<<",
        ">>",
        ">>>",
        "+=",
        "-=",
        "*=",
        "/=",
        "&=",
        "|=",
        "^=",
        "%=",
        "<<=",
        ">>=",
        ">>>=",
        "...",
    ],

    comparisonOperators: [
        ">",
        "<",
        "==",
        "<=",
        ">=",
        "!=",
    ],

    // we include these common regular expressions
    symbols: /[=><!~?:&|+\-*/^%]+/,
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    integersuffix: /(ll|LL|u|U|l|L)?(ll|LL|u|U|l|L)?/,
    floatsuffix: /[fFlL]?/,
    encoding: /u|u8|U|L/,

    // The main tokenizer for our languages
    tokenizer: {
        root: [
            // Macro
            [/[A-Z][A-Z0-9_]*(?=\b)/, { token: "macro" }],

            // PascalCase for types
            [/[A-Z]\w*/, { token: "storage.type" }],

            // function call
            [/[a-zA-Z_]\w*(?=\()/, { token: "function" }],

            // identifiers and keywords
            [
                /[a-zA-Z_]\w*/,
                {
                    cases: {
                        "@keywords": { token: "keyword.$0" },
                        "@types": { token: "storage.type.$0" },
                        "@default": "identifier",
                    },
                },
            ],

            // The preprocessor checks must be before whitespace as they check /^\s*#/ which
            // otherwise fails to match later after other whitespace has been removed.

            // Inclusion
            [/^\s*#\s*include/, { token: "keyword.directive.include", next: "@include" }],

            // Preprocessor directive
            [/^\s*#\s*\w+/, "keyword.directive"],

            // whitespace
            { include: "@whitespace" },

            // [[ attributes ]].
            [/\[\s*\[/, { token: "annotation", next: "@annotation" }],
            // delimiters and operators
            [/[{}()[\]]/, "@brackets"],
            [/[<>](?!@symbols)/, "@brackets"],
            [
                /@symbols/,
                {
                    cases: {
                        "@comparisonOperators": { token: "operator.comparison" },
                        "@operators": { token: "operator" },
                        "@default": { token: "delimiter" },
                    },
                },
            ],

            // numbers
            [/\d*\d+[eE]([-+]?\d+)?(@floatsuffix)/, "number.float"],
            [/\d*\.\d+([eE][-+]?\d+)?(@floatsuffix)/, "number.float"],
            [/0[xX][0-9a-fA-F']*[0-9a-fA-F](@integersuffix)/, "number.hex"],
            [/0[0-7']*[0-7](@integersuffix)/, "number.octal"],
            [/0[bB][0-1']*[0-1](@integersuffix)/, "number.binary"],
            [/\d[\d']*\d(@integersuffix)/, "number"],
            [/\d(@integersuffix)/, "number"],

            // delimiter: after number because of .\d floats
            [/[;,.]/, "delimiter"],

            // strings
            [/"([^"\\]|\\.)*$/, "string.invalid"], // non-teminated string
            [/"/, "string", "@string"],

            // characters
            [/'[^\\']'/, "string"],
            [/(')(@escapes)(')/, ["string", "string.escape", "string"]],
            [/'/, "string.invalid"],
        ],

        whitespace: [
            [/[ \t\r\n]+/, ""],
            [/\/\*\*(?!\/)/, "comment.doc", "@doccomment"],
            [/\/\*/, "comment", "@comment"],
            [/\/\/.*\\$/, "comment", "@linecomment"],
            [/\/\/.*$/, "comment"],
        ],

        comment: [
            [/[^/*]+/, "comment"],
            [/\*\//, "comment", "@pop"],
            [/[/*]/, "comment"],
        ],

        //For use with continuous line comments
        linecomment: [
            [/.*[^\\]$/, "comment", "@pop"],
            [/[^]+/, "comment"],
        ],

        //Identical copy of comment above, except for the addition of .doc
        doccomment: [
            [/[^/*]+/, "comment.doc"],
            [/\*\//, "comment.doc", "@pop"],
            [/[/*]/, "comment.doc"],
        ],

        string: [
            [/[^\\"]+/, "string"],
            [/@escapes/, "string.escape"],
            [/\\./, "string.escape.invalid"],
            [/"/, "string", "@pop"],
        ],

        raw: [
            [
                /(.*)(\))(?:([^ ()\\\t"]*))(")/,
                {
                    cases: {
                        "$3==$S2": [
                            "string.raw",
                            "string.raw.end",
                            "string.raw.end",
                            { token: "string.raw.end", next: "@pop" },
                        ],
                        "@default": ["string.raw", "string.raw", "string.raw", "string.raw"],
                    },
                },
            ],
            [/.*/, "string.raw"],
        ],

        annotation: [
            { include: "@whitespace" },
            [/using|alignas/, "keyword"],
            [/[a-zA-Z0-9_]+/, "annotation"],
            [/[,:]/, "delimiter"],
            [/[()]/, "@brackets"],
            [/\]\s*\]/, { token: "annotation", next: "@pop" }],
        ],

        include: [
            [
                /(\s*)(<)([^<>]*)(>)/,
                [
                    "",
                    "keyword.directive.include.begin",
                    "string.include.identifier",
                    { token: "keyword.directive.include.end", next: "@pop" },
                ] as languages.IMonarchLanguageAction,
            ],
            [
                /(\s*)(")([^"]*)(")/,
                [
                    "",
                    "keyword.directive.include.begin",
                    "string.include.identifier",
                    { token: "keyword.directive.include.end", next: "@pop" },
                ] as languages.IMonarchLanguageAction,
            ],
        ],
    },
}
