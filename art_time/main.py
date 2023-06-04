from PyQt5.QtWidgets import QApplication, QMainWindow, QVBoxLayout, QPushButton, QWidget, QToolBar, QAction, QColorDialog
from PyQt5.QtGui import QIcon, QPainter, QPen
from PyQt5.QtCore import Qt, QPoint

class DrawingArea(QWidget):
    def __init__(self):
        super().__init__()

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Art-Time")

        self.drawing_area = DrawingArea()

        self.init_ui()
    
    def init_ui(self):
        self.setGeometry(100, 100, 800, 600)

        self.create_color_toolbar()
        self.create_brush_toolbar()
        self.create_other_toolbar()

        self.setCentralWidget(self.drawing_area)

    def create_color_toolbar(self):
        colors = ['black', 'white', 'red', 'green', 'blue', 'yellow']
        
        color_toolbar = QToolBar("Colors", self)
        color_toolbar.setOrientation(Qt.Vertical)
        
        for color in colors:
            action = QAction(QIcon(), color, self)
            action.triggered.connect(lambda color=color: self.select_color(color))
            color_toolbar.addAction(action)
        
        self.addToolBar(Qt.LeftToolBarArea, color_toolbar)

    def create_brush_toolbar(self):
        brushes = ['pen', 'brush']

        brush_toolbar = QToolBar("Brushes", self)
        
        for brush in brushes:
            action = QAction(QIcon(), brush, self)
            action.triggered.connect(lambda brush=brush: self.select_brush(brush))
            brush_toolbar.addAction(action)

        self.addToolBar(Qt.TopToolBarArea, brush_toolbar)

    def create_other_toolbar(self):
        other_toolbar = QToolBar("Other Options", self)
        other_toolbar.setOrientation(Qt.Vertical)
        self.addToolBar(Qt.BottomToolBarArea, other_toolbar)

    def select_color(self, color):
        print(f"Selected color: {color}")

    def select_brush(self, brush):
        print(f"Selected brush: {brush}")

app = QApplication([])
window = MainWindow()
window.show() 
app.exec_()
