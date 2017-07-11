#include "opencv2/imgproc.hpp"
#include "opencv2/highgui.hpp"

#include <string>

#include <stdlib.h>
#include <stdio.h>

using namespace cv;
using namespace std;

int main( int argc, char** argv )
{

  const int ratio = 3;
  const int kernel_size = 3;

  const string inputName = argv[1];
  const string outputName = argv[2];
  const string inputThresh = argv[3];   // trackbar value

  int thresh = atoi(inputThresh.c_str());

  Mat src = imread( argv[1] );

  cvtColor( src, src, COLOR_BGR2GRAY );

  blur(src, src, Size(3,3));
  Canny(src, src, thresh, thresh*ratio, kernel_size);

  imwrite(outputName, src);
 
  return 0;
}
