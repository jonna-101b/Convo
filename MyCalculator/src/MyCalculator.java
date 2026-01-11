import javax.swing.*;
import java.awt.*;

public class MyCalculator extends JFrame {
    private JButton one;
    private JButton two;
    private JButton three;
    private JButton four;
    private JButton five;
    private JButton six;
    private JButton seven;
    private JButton eight;
    private JButton nine;
    private JButton zero;

    private JButton add;
    private JButton subtract;
    private JButton multiply;
    private JButton divide;
    private JButton equals;
    private JButton clear;
    private JButton dot;

    private JLabel display;

    private JPanel opContainer;

    public MyCalculator() {
        setSize(250, 500);

        one = new JButton("1");
        two = new JButton("2");
        three = new JButton("3");
        four = new JButton("4");
        five = new JButton("5");
        six = new JButton("6");
        seven = new JButton("7");
        eight = new JButton("8");
        nine = new JButton("9");
        zero = new JButton("0");
        add = new JButton("+");
        subtract = new JButton("-");
        multiply = new JButton("*");
        divide = new JButton("/");
        equals = new JButton("=");
        clear = new JButton("C");
        dot = new JButton(".");

        display = new JLabel("hhh");
        display.setPreferredSize(new Dimension(250, 50));

        opContainer = new JPanel();
        opContainer.setLayout(new GridLayout(4, 4));

        opContainer.add(seven);
        opContainer.add(eight);
        opContainer.add(nine);
        opContainer.add(divide);
        opContainer.add(four);
        opContainer.add(five);
        opContainer.add(six);
        opContainer.add(multiply);
        opContainer.add(one);
        opContainer.add(two);
        opContainer.add(three);
        opContainer.add(subtract);
        opContainer.add(dot);
        opContainer.add(zero);
        opContainer.add(equals);
        opContainer.add(add);
        opContainer.add(clear);

        Container frame = getContentPane();
        frame.add(display);
        frame.add(opContainer);
        frame.setBackground(Color.CYAN);
        setVisible(true);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    public static void main(String[] args) {
        new MyCalculator();
    }
}
