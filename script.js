function convertToIEEE() {
    const num = parseFloat(document.getElementById("decimal-input").value);

    if (isNaN(num)) {
        alert("Please enter a valid decimal number!");
        return;
    }

    // Step 1: Determine the sign bit
    const sign = num >= 0 ? 0 : 1;
    let absNum = Math.abs(num);

    // Step 2: Convert to binary scientific notation
    const integerPart = Math.floor(absNum);
    const fractionalPart = absNum - integerPart;

    const integerBinary = integerPart.toString(2);
    let fractionalBinary = "";
    let fraction = fractionalPart;

    while (fraction !== 0 && fractionalBinary.length < 23) {
        fraction *= 2;
        const bit = Math.floor(fraction);
        fractionalBinary += bit;
        fraction -= bit;
    }

    const binaryRepresentation = integerBinary + "." + fractionalBinary;

    // Step 3: Find the exponent and mantissa
    let exponent, mantissa;

    if (integerPart !== 0) {
        exponent = integerBinary.length - 1;
        mantissa = integerBinary.slice(1) + fractionalBinary;
    } else {
        const firstOneIndex = fractionalBinary.indexOf("1");
        exponent = -(firstOneIndex + 1);
        mantissa = fractionalBinary.slice(firstOneIndex + 1);
    }

    // Normalize mantissa
    mantissa = mantissa.padEnd(23, "0").slice(0, 23);

    // Step 4: Calculate biased exponent
    const biasedExponent = 127 + exponent;
    const exponentBits = biasedExponent.toString(2).padStart(8, "0");

    // Step 5: Combine sign, exponent, and mantissa
    const ieeeBinary = `${sign}${exponentBits}${mantissa}`;
    const ieeeHex = parseInt(ieeeBinary, 2).toString(16).toUpperCase().padStart(8, "0");

    // Display the results
    document.getElementById("sign-bit").innerText = sign;
    document.getElementById("exponent-bits").innerText = exponentBits;
    document.getElementById("mantissa-bits").innerText = mantissa;
    document.getElementById("binary").innerText = ieeeBinary;
    document.getElementById("hexadecimal").innerText = ieeeHex;
}
